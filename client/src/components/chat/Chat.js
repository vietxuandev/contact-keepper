import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import ChatContext from '../../context/chat/chatContext';
import { useParams } from 'react-router-dom';
import Linkify from 'react-linkify';
import AuthContext from '../../context/auth/authContext';
import ClassNames from 'classnames';
import ReactEmoji from 'react-emoji';
import UserDefault from '../user-default.jpg';

import io from 'socket.io-client';
import './style.css';
let socket;

const Chat = () => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  const ENDPOINT = 'localhost:5000';
  const token = localStorage.token ? localStorage.token : '';
  const { id = '' } = useParams();
  const [content, setContent] = useState('');
  const [typing, setTyping] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [connected, setConnected] = useState(false);
  const [notifyTyping, setNotifyTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const {
    getConversation = () => {},
    getMessages = () => {},
    addMessage = () => {},
    messages = [],
    conversation = {},
  } = chatContext;

  const onSubmit = (content) => {
    if (content) {
      socket.emit('sendMessage', { id, content }, () => setContent(''));
    }
  };

  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };

  const onScroll = (e) => {
    setShowScroll(
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) > 150
    );
  };
  const [width, height] = useWindowSize();
  useEffect(() => {
    socket = io(ENDPOINT, {
      query: { token },
    });
    socket.on('connect', () => {
      setConnected(true);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUser();
    getMessages(id);
    getConversation(id);
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
          ele.outerHTML = '';
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (connected) {
      socket.emit('join', id, () => {});
      socket.on('message', (message) => {
        addMessage(message);
      });
      socket.on('notifyTyping', (data) => {
        setNotifyTyping(data.typing);
      });
    }
    // eslint-disable-next-line
  }, [connected]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line
  }, [messages, content, notifyTyping]);

  useEffect(() => {
    if (content !== '') {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [content]);

  useEffect(() => {
    if (connected) {
      socket.emit('typing', typing);
    }
  }, [typing, connected]);

  return (
    <div className='messages-wrapper'>
      <div className='conversation-name'>
        <span className='online'></span>
        {conversation.name ||
          conversation.participants
            .filter((participant) => participant._id !== user._id)
            .map((participant) => participant.name)
            .toString()
            .replace(',', ', ')}
      </div>
      <div
        onScroll={onScroll}
        className='messages-scroll'
        style={{ height: width < 992 ? height - 175 : height - 205 }}
      >
        <div className='messages'>
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={ClassNames('messageContainer', {
                sender: user._id === message.sender,
              })}
            >
              {user._id !== message.sender &&
                (index === messages.length - 1 ||
                  messages[index + 1].sender === user._id) && (
                  <img src={UserDefault} className='avatar-user' alt='avatar' />
                )}
              <div
                className={ClassNames('messageBox', {
                  firstMessage: index === 0,
                })}
              >
                <div className='messageText'>
                  <Linkify target='_blank'>
                    {ReactEmoji.emojify(message.content)}
                  </Linkify>
                </div>
              </div>
              {user._id === message.sender && index === messages.length - 1 && (
                <img src={UserDefault} className='status' alt='avatar' />
              )}
            </div>
          ))}
          {notifyTyping && (
            <div className='messageContainer'>
              <img src={UserDefault} className='avatar-user' alt='avatar' />
              <div className='messageBox'>
                <div className='messageText'>
                  <div id='wave'>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showScroll && (
            <div className='scroll-to-bottom' onClick={() => scrollToBottom()}>
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className='input-message'>
        <input
          placeholder='Message...'
          type='text'
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          onKeyPress={(evt) =>
            evt.key === 'Enter' ? onSubmit(evt.target.value) : null
          }
        />
        <button
          onClick={() => onSubmit(content)}
          className='btn btn-send'
          type='submit'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
