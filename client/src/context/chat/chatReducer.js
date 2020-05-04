import { GET_MESSAGES, ADD_MESSAGE, GET_CONVERSATIONS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
