import {
  GET_PEOPLE,
  PEOPLE_ERROR,
  FILTER_PEOPLE,
  CLEAR_FILTER_PEOPLE,
  ADD_FRIEND,
  CLEAR_FRIEND_ERROR,
  REJECT_FRIEND,
  ACCEPT_FRIEND,
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
    case ADD_FRIEND:
    case ACCEPT_FRIEND:
    case REJECT_FRIEND:
      const indexPerson = state.people.findIndex(
        (person) => person._id === action.payload._id
      );
      const people = state.people;
      if (indexPerson !== -1) {
        people[indexPerson] = action.payload;
      }
      const filtered = state.filtered;
      if (filtered) {
        const indexFilter = state.filtered.findIndex(
          (person) => person._id === action.payload._id
        );
        if (indexFilter !== -1) {
          filtered[indexFilter] = action.payload;
        }
      }
      if (filtered) {
        return {
          ...state,
          people,
          filtered,
        };
      } else {
        return {
          ...state,
          people,
        };
      }
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
    case CLEAR_FRIEND_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
