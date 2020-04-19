import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingIndicator from '../LoadingIndicator';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  useEffect(() => {
    getContacts();
    // getPeople();
    // eslint-disable-next-line
  }, []);
  if ((contacts !== null && contacts.length) === 0 && !loading) {
    return <h4>Please add the contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <LoadingIndicator />
      )}
    </Fragment>
  );
};

export default Contacts;
