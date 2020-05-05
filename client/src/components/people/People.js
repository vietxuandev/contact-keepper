import React, { useEffect, useContext, Fragment } from 'react';
import PeopleContext from '../../context/people/peopleContext';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import PeopletFilter from './PeopleFilter';
import './style.css';

const People = (props) => {
  const peopleContext = useContext(PeopleContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    getPeople,
    people,
    error,
    filtered,
    clearFriendErrors,
    addFriend,
    acceptFriend,
    rejectFriend,
  } = peopleContext;
  useEffect(() => {
    authContext.loadUser();
    getPeople();
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
          ele.outerHTML = '';
        }
      }, 2000);
    }
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
                {person.status === 0 ? (
                  <button
                    className='btn btn-primary btn-sm'
                    style={{ float: 'right' }}
                    onClick={() => addFriend(person._id)}
                  >
                    Add friend
                  </button>
                ) : person.status === 1 ? (
                  <button
                    className='btn btn-primary btn-sm'
                    style={{ float: 'right' }}
                    onClick={() => rejectFriend(person._id)}
                  >
                    Cancel request
                  </button>
                ) : person.status === 2 ? (
                  <Fragment>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => rejectFriend(person._id)}
                    >
                      Reject
                    </button>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => acceptFriend(person._id)}
                    >
                      Accept
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => rejectFriend(person._id)}
                    >
                      Remove
                    </button>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => {}}
                    >
                      Friend
                    </button>
                  </Fragment>
                )}
              </div>
              <p></p>
            </div>
          ))
        : people &&
          people.map((person) => (
            <div className='card bg-light' key={person._id}>
              <div>
                {person.name}
                {person.status === 0 ? (
                  <button
                    className='btn btn-primary btn-sm'
                    style={{ float: 'right' }}
                    onClick={() => addFriend(person._id)}
                  >
                    Add friend
                  </button>
                ) : person.status === 1 ? (
                  <button
                    className='btn btn-primary btn-sm'
                    style={{ float: 'right' }}
                    onClick={() => rejectFriend(person._id)}
                  >
                    Cancel request
                  </button>
                ) : person.status === 2 ? (
                  <Fragment>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => rejectFriend(person._id)}
                    >
                      Reject
                    </button>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => acceptFriend(person._id)}
                    >
                      Accept
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => rejectFriend(person._id)}
                    >
                      Remove
                    </button>
                    <button
                      className='btn btn-primary btn-sm'
                      style={{ float: 'right' }}
                      onClick={() => {}}
                    >
                      Friend
                    </button>
                  </Fragment>
                )}
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
