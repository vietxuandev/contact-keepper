import React, { useContext, useEffect } from 'react';
import ChatContext from '../../context/chat/chatContext';
import { useHistory } from 'react-router-dom';

const Conversation = () => {
  const chatContext = useContext(ChatContext);
  const { getConversations = () => {}, conversations = [] } = chatContext;
  const history = useHistory();
  useEffect(() => {
    getConversations();
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
  }, []);
  return (
    <div>
      {conversations.map((conversation) => (
        <div className='card bg-light' key={conversation._id}>
          <div>
            {conversation.name ||
              conversation.participants
                .map((participant) => participant.name)
                .toString()}
            <button
              className='btn btn-primary btn-sm'
              style={{ float: 'right' }}
              onClick={() => {
                history.push(`/chat/${conversation._id}`);
              }}
            >
              Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversation;
