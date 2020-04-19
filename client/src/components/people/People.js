import React, { useEffect, useContext } from 'react';
import PeopleContext from '../../context/people/peopleContext';
import AlertContext from '../../context/alert/alertContext';
import PeopletFilter from './PeopleFilter';

const People = (props) => {
  const peopleContext = useContext(PeopleContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const {
    getPeople,
    people,
    error,
    filtered,
    clearFriendErrors,
    addFriend,
  } = peopleContext;
  useEffect(() => {
    getPeople();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearFriendErrors();
    }
    // eslint-disable-next-line
  }, [error, props.history]);
  return (
    <div>
      <PeopletFilter />
      {filtered !== null
        ? filtered.map((person) => (
            <div className='card bg-light' key={person._id}>
              <div>
                {person.name}
                <button
                  className='btn btn-primary btn-sm'
                  style={{ float: 'right' }}
                  onClick={() => addFriend(person._id)}
                >
                  Add fiend
                </button>
              </div>
              <p></p>
            </div>
          ))
        : people &&
          people.map((person) => (
            <div className='card bg-light' key={person._id}>
              <div>
                {person.name}{' '}
                <button
                  className='btn btn-primary btn-sm'
                  style={{ float: 'right' }}
                  onClick={() => addFriend(person._id)}
                >
                  Add fiend
                </button>
              </div>
              <p></p>
            </div>
          ))}
      {/* <TransitionGroup>
        {filtered
          ? filtered.map((person) => (
              <CSSTransition key={person._id} timeout={500} classNames='item'>
                <div className='card bg-light' key={person._id}>
                  <div>
                    {person.name}
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                    >
                      Add fiend
                    </button>
                  </div>
                </div>
              </CSSTransition>
            ))
          : people.map((person) => (
              <CSSTransition key={person._id} timeout={500} classNames='item'>
                <div className='card bg-light' key={person._id}>
                  <div>
                    {person.name}
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                    >
                      Add fiend
                    </button>
                  </div>
                </div>
              </CSSTransition>
            ))}
      </TransitionGroup> */}
    </div>
  );
};

export default People;
