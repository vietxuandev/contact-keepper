import React from 'react';

const Chat = () => {
  return (
    <div>
      <input type='text' placeholder='Type a message...' />
      <button className='btn btn-primary btn-block'>Send message</button>
    </div>
  );
};

export default Chat;
