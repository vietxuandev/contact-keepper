import React, { useReducer } from 'react';
import axios from 'axios';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import {
  GET_MESSAGES,
  MESSAGES_ERROR,
  ADD_MESSAGE,
  CONVERSATION_ERROR,
  GET_CONVERSATIONS,
  GET_CONVERSATION,
} from '../types';

const ChatState = (props) => {
  const initialState = {
    conversation: { name: "", participants: [] },
    conversations: [],
    messages: [],
    error: null,
  };
  const [state, dispatch] = useReducer(chatReducer, initialState);
  //Get messages
  const getMessages = async (id) => {
    try {
      const res = await axios.get(`/api/chat/message/${id}`);
      dispatch({ type: GET_MESSAGES, payload: res.data });
    } catch (error) {
      dispatch({ type: MESSAGES_ERROR, payload: error.response.msg });
    }
  };

  //Get messages
  const getConversations = async () => {
    try {
      const res = await axios.get(`/api/chat/conversation`);
      dispatch({ type: GET_CONVERSATIONS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }
  };
  //Get messages
  const getConversation = async (id) => {
    try {
      const res = await axios.get(`/api/chat/conversation/${id}`);
      dispatch({ type: GET_CONVERSATION, payload: res.data });
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }
  };

  //Add message
  const addMessage = async (message) => {
    dispatch({ type: ADD_MESSAGE, payload: message });
  };

  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        conversations: state.conversations,
        conversation: state.conversation,
        error: state.error,
        getMessages,
        addMessage,
        getConversations,
        getConversation
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
