import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;

const Chat = ({ location }) => {
  const token = localStorage.token;
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';
  useEffect(() => {
    const { room } = queryString.parse(location.search);
    socket = io(ENDPOINT, { query: { token } });
    setRoom(room);
    socket.emit('join', { room }, () => {});
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = (evt) => {
    evt.preventDefault();
    if (messages) {
      socket.emit('message', message, () => setMessage(''));
    }
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Type a message...'
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <button
        className='btn btn-primary btn-block'
        onClick={(e) => sendMessage(e)}
      >
        Send message
      </button>
    </div>
  );
};

export default Chat;
