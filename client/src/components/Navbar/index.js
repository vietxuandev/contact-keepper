import React, { useState, useContext, Fragment } from 'react';
import ClassNames from 'classnames';
import MenuButton from '../MenuButton';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import './style.scss';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;
  const [toggle, setToggle] = useState(false);
  const onLogout = () => {
    logout();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li>
        <NavLink
          exact
          to='/join'
          onClick={() => {
            setToggle(false);
          }}
        >
          Join
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to='/register'
          onClick={() => {
            setToggle(false);
          }}
        >
          Hello {user && user.name}
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to='#!'
          onClick={() => {
            setToggle(false);
            onLogout();
          }}
        >
          <i className='fa fa-sign-out' aria-hidden='true'></i> Logout
        </NavLink>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <NavLink
          exact
          to='/register'
          onClick={() => {
            setToggle(false);
          }}
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to='/login'
          onClick={() => {
            setToggle(false);
          }}
        >
          Login
        </NavLink>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar-wrapper'>
      <div className='header-content clearfix'>
        <div className='text-logo'>
          <NavLink exact to='/'>
            <div className='logo-symbol'>X</div>
            <div className='logo-text'>
              Xuan's <span>CV</span>
            </div>
          </NavLink>
        </div>
        <div
          className={ClassNames(
            'site-nav',
            { 'mobile-menu-hide': !toggle },
            { 'mobile-menu-show': toggle }
          )}
        >
          <ul className='site-main-menu'>
            <li>
              <NavLink
                exact
                to='/'
                onClick={() => {
                  setToggle(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to='/about'
                onClick={() => {
                  setToggle(false);
                }}
              >
                About
              </NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
        <div
          className='menu-toggle mobile-visible'
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <MenuButton toggle={toggle} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
