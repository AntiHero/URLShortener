import React, { useContext } from "react";
import {NavLink, useHistory} from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const NavBar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logougtHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav className="navigation pink lighten-3">
      <div className="nav-wrapper ">
        <span className="brand-logo">
          URL Shortener
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to='/create'>Create</NavLink>
          </li>
          <li>
            <NavLink to='/links'>My links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logougtHandler}>Log out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
