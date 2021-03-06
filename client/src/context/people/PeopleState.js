import React, { useReducer } from 'react';
import axios from 'axios';
import PeopleContext from './peopleContext';
import peopleReducer from './peopleReducer';
import {
  GET_PEOPLE,
  PEOPLE_ERROR,
  FILTER_PEOPLE,
  CLEAR_FILTER_PEOPLE,
  ADD_FRIEND,
  FRIEND_ERROR,
  CLEAR_FRIEND_ERROR,
  REJECT_FRIEND,
  ACCEPT_FRIEND,
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
  //Add friend
  const addFriend = async (id) => {
    try {
      const res = await axios.get(`/api/people/add-friend/${id}`);
      dispatch({ type: ADD_FRIEND, payload: res.data });
    } catch (error) {
      dispatch({ type: FRIEND_ERROR, payload: error.response.msg });
    }
  };
  //Accept friend
  const acceptFriend = async (id) => {
    try {
      const res = await axios.get(`/api/people/accept-friend/${id}`);
      dispatch({ type: ACCEPT_FRIEND, payload: res.data });
    } catch (error) {
      dispatch({ type: FRIEND_ERROR, payload: error.response.msg });
    }
  };
  //Reject friend
  const rejectFriend = async (id) => {
    try {
      const res = await axios.get(`/api/people/reject-friend/${id}`);
      dispatch({ type: REJECT_FRIEND, payload: res.data });
    } catch (error) {
      dispatch({ type: FRIEND_ERROR, payload: error.response.msg });
    }
  };
  //Clear Errors
  const clearFriendErrors = () => dispatch({ type: CLEAR_FRIEND_ERROR });
  return (
    <PeopleContext.Provider
      value={{
        people: state.people,
        filtered: state.filtered,
        error: state.error,
        getPeople,
        filterPeople,
        clearFilterPeople,
        addFriend,
        acceptFriend,
        rejectFriend,
        clearFriendErrors,
      }}
    >
      {props.children}
    </PeopleContext.Provider>
  );
};

export default PeopleState;
