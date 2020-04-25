import {
  GET_MESSAGES,
  SEND_MESSAGE,
  MESSAGES_ERROR,
  MESSAGE_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
