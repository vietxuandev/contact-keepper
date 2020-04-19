import React, { useContext, useRef, useEffect } from 'react';
import PeopleContext from '../../context/people/peopleContext';

const ContactFilter = () => {
  const peopleContext = useContext(PeopleContext);
  const text = useRef('');
  const { filterPeople, clearFilterPeople, filtered } = peopleContext;
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPeople(e.target.value);
    } else {
      clearFilterPeople();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contact...'
        onChange={onChange}
      ></input>
    </form>
  );
};

export default ContactFilter;
