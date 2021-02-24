import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Header({ currentUser, resetCurrentUser}) {

    const history = useHistory();

    function handleLogout() {
      resetCurrentUser(null)
      history.push("/");
    }

  return (
    <div className="header">
        <h1>Header Placeholder</h1>
        <NavLink to="/" className="nav-link">
            Home
        </NavLink>
        {currentUser ? (
        <>
          <NavLink to="/scores" className="nav-link">
            Leaderboard
          </NavLink>
          <button className="logout" onClick={handleLogout}>Log Out</button>
        </>
        ) : (
        <>
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
          <NavLink to="/login" className="nav-link">
          Login
          </NavLink>
        </>
           )
         }
    </div>
  );
}

export default Header;