import {
  GET_PEOPLE,
  PEOPLE_ERROR,
  FILTER_PEOPLE,
  CLEAR_FILTER_PEOPLE,
  ADD_FRIEND,
  CLEAR_FRIEND_ERROR,
} from '../types';

const removeAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export default (state, action) => {
  switch (action.type) {
    case GET_PEOPLE:
      return {
        ...state,
        people: action.payload,
      };
    case PEOPLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FILTER_PEOPLE:
      return {
        ...state,
        filtered: state.people.filter((person) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            removeAccents(person.name).match(regex) ||
            removeAccents(person.email).match(regex)
          );
        }),
      };
    case CLEAR_FILTER_PEOPLE:
      return {
        ...state,
        filtered: null,
      };
    case ADD_FRIEND:
      return {
        ...state,
        filtered: null,
      };
    case CLEAR_FRIEND_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
