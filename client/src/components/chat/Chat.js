import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatContext from '../../context/chat/chatContext';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ClassNames from 'classnames';
import ReactEmoji from 'react-emoji';

import io from 'socket.io-client';
import './style.css';
let socket;

const Chat = ({ location }) => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  const ENDPOINT = '192.168.0.147:5000';
  const token = localStorage.token ? localStorage.token : '';
  const { id = '' } = useParams();
  const [content, setContent] = useState('');
  const [listMess, setListMess] = useState([]);
  const [typing, setTyping] = useState(false);
  const [notifyTyping, setNotifyTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };
  const {
    getMessages = () => {},
    // sendMessage = () => {},
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

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket = io(ENDPOINT, {
      query: { token },
    });
    socket.emit('join', id, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location]);

  useEffect(() => {
    getMessages(id);
  }, []);

  useEffect(() => {
    setListMess(messages);
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message) => {
      setListMess((listMess) => [...listMess, message]);
    });
    socket.on('notifyTyping', (data) => {
      setNotifyTyping(data.typing);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [listMess]);

  useEffect(() => {
    scrollToBottom();
  }, [content, notifyTyping]);

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
    <div>
      <div className='messages'>
        {listMess.map((message) => (
          <div
            key={message._id}
            className={ClassNames('messageContainer', {
              sender: user._id === message.sender,
            })}
          >
            <div className='messageBox'>
              <p className='messageText'>
                {ReactEmoji.emojify(message.content)}
              </p>
            </div>
          </div>
        ))}
        {notifyTyping && (
          <div className='messageContainer'>
            <div className='messageBox'>
              <p className='messageText'>Đang nhập...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <input
          placeholder='Type a message...'
          type='text'
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          onKeyPress={(evt) =>
            evt.key === 'Enter' ? onSubmit(evt.target.value) : null
          }
        />
        <button
          onClick={() => onSubmit(content)}
          className='btn btn-primary btn-block'
          type='submit'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
