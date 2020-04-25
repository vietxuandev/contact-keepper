import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Join from './components/join/Join';
import Chat from './components/chat/Chat';
import People from './components/people/People';
import Alerts from './components/layout/Alerts';
import ScrollTop from './components/ScrollTop';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import PeopleState from './context/people/PeopleState';
import ChatState from './context/chat/ChatState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const logit = () => {
    setScrollY(window.pageYOffset);
  };
  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', logit);
    };
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <PeopleState>
            <ChatState>
              <Router>
                <Fragment>
                  {scrollY >= 50 && <ScrollTop />}
                  <Navbar />
                  <div className='container'>
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/join' component={Join} />
                      <Route exact path='/chat/:id' component={Chat} />
                      <Route exact path='/people' component={People} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </ChatState>
          </PeopleState>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
