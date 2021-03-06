import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Chat from './components/chat/Chat';
import Conversation from './components/conversation/Conversation';
import People from './components/people/People';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import PeopleState from './context/people/PeopleState';
import ChatState from './context/chat/ChatState';
import NotFound from './components/notfound/NotFound';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <PeopleState>
            <ChatState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className='container'>
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/login' component={Login} />
                      <PrivateRoute exact path='/chat/:id' component={Chat} />
                      <PrivateRoute exact path='/people' component={People} />
                      <PrivateRoute
                        exact
                        path='/conversation'
                        component={Conversation}
                      />
                      <Route path='/' component={NotFound} />
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
