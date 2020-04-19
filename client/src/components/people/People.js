import React, { useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PeopleContext from '../../context/people/peopleContext';
import PeopletFilter from './PeopleFilter';

const People = () => {
  const peopleContext = useContext(PeopleContext);
  const { getPeople, people, error, filtered } = peopleContext;
  useEffect(() => {
    getPeople();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PeopletFilter />
      {filtered !== null
        ? filtered.map((person) => (
            <div className='card bg-light' key={person._id}>
              <div>
                {person.name}{' '}
                <button
                  className='btn btn-primary btn-sm'
                  style={{ float: 'right' }}
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
