import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import ChatContext from '../../context/chat/chatContext';
import { useParams } from 'react-router-dom';
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
  const ENDPOINT = '150.95.113.203:5000';
  const token = localStorage.token ? localStorage.token : '';
  const { id = '' } = useParams();
  const [content, setContent] = useState('');
  const [typing, setTyping] = useState(false);
  const [notifyTyping, setNotifyTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };
  const {
    getMessages = () => { },
    addMessage = () => { },
    messages = [],
  } = chatContext;

  const sendMessage = (id, content) => {
    if (content) {
      socket.emit('sendMessage', { id, content }, () => setContent(''));
    }
  };

  const onSubmit = (content) => {
    sendMessage(id, content);
  };
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };
  const [width, height] = useWindowSize();
  useEffect(() => {
    loadUser();
    getMessages(id);
    socket = io(ENDPOINT, {
      query: { token },
    });
    socket.emit('join', id, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on('message', (message) => {
      addMessage(message);
    });
    socket.on('notifyTyping', (data) => {
      setNotifyTyping(data.typing);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, content, notifyTyping]);

  useEffect(() => {
    if (content !== '') {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [content]);

  useEffect(() => {
    socket.emit('typing', typing);
  }, [typing]);

  return (
    <div className='messages-wrapper'>
      <div className='conversation-name'>Ahihi</div>
      <div
        className='messages'
        style={{ height: width < 992 ? height - 175 : height - 205 }}
      >
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
              <p className='messageText'>
                {ReactEmoji.emojify(message.content)}
              </p>
            </div>
            {user._id === message.sender && index === messages.length - 1 && (
              <img src={UserDefault} className='status' alt='avatar' />
            )}
          </div>
        ))}
        {notifyTyping && (
          <div className='messageContainer'>
            <div className='messageBox'>
              <p className='messageText'>
                <div id='wave'>
                  <span className='dot'></span>
                  <span className='dot'></span>
                  <span className='dot'></span>
                </div>
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
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
