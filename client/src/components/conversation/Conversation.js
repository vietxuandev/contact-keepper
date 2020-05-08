import React, { useContext, useEffect } from 'react';
import ChatContext from '../../context/chat/chatContext';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const Conversation = () => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { user, loadUser = () => {} } = authContext;
  const { getConversations = () => {}, conversations = [] } = chatContext;
  const history = useHistory();
  useEffect(() => {
    loadUser();
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
  if ((conversations !== null && conversations.length) === 0) {
    return <h4>Empty conversation</h4>;
  }
  return (
    <div>
      {conversations.map((conversation) => (
        <div className='card bg-light' key={conversation._id}>
          <div>
            {conversation.name ||
              conversation.participants
                .filter((participant) => participant._id !== user._id)
                .map((participant) => participant.name)
                .toString()
                .replace(',', ', ')}
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
