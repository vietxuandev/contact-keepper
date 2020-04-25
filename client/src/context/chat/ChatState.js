import React, { useReducer } from 'react';
import axios from 'axios';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import {
  GET_MESSAGES,
  MESSAGES_ERROR,
  SEND_MESSAGE,
  MESSAGE_ERROR,
} from '../types';

const ChatState = (props) => {
  const initialState = {
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

  //Send message
  const sendMessage = async (id, content) => {
    try {
      const res = await axios.post(`/api/chat/message/${id}`, { content });
      dispatch({ type: SEND_MESSAGE, payload: res.data });
    } catch (error) {
      dispatch({ type: MESSAGE_ERROR, payload: error.response.msg });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        error: state.error,
        getMessages,
        sendMessage,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
