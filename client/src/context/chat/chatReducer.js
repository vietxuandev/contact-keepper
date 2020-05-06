import { GET_MESSAGES, ADD_MESSAGE, GET_CONVERSATIONS, GET_CONVERSATION } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
