import React, { useReducer } from 'react';
import axios from 'axios';
import PeopleContext from './peopleContext';
import peopleReducer from './peopleReducer';
import {
  GET_PEOPLE,
  PEOPLE_ERROR,
  FILTER_PEOPLE,
  CLEAR_FILTER_PEOPLE,
} from '../types';

const PeopleState = (props) => {
  const initialState = {
    people: null,
    error: null,
    filtered: null,
  };
  const [state, dispatch] = useReducer(peopleReducer, initialState);
  //Get people
  const getPeople = async () => {
    try {
      const res = await axios.get('/api/people');
      dispatch({ type: GET_PEOPLE, payload: res.data });
    } catch (error) {
      dispatch({ type: PEOPLE_ERROR, payload: error.response.msg });
    }
  };
  //Filter people
  const filterPeople = (text) => {
    dispatch({ type: FILTER_PEOPLE, payload: text });
  };
  //Clear filter people
  const clearFilterPeople = () => {
    dispatch({ type: CLEAR_FILTER_PEOPLE });
  };
  return (
    <PeopleContext.Provider
      value={{
        people: state.people,
        filtered: state.filtered,
        error: state.error,
        getPeople,
        filterPeople,
        clearFilterPeople,
      }}
    >
      {props.children}
    </PeopleContext.Provider>
  );
};

export default PeopleState;
