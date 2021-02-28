import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Header({ currentUser, resetCurrentUser }) {
  const history = useHistory();

  function handleLogout() {
    resetCurrentUser(null);
    history.push("/");
  }

  return (
      <div>
    <div className="header">
      <h1 className="header-name">Synonym</h1>
      <ul className="nav-bar">
        <li className="nav-li">
          <NavLink exact activeClassName="active" to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        {currentUser ? (
          <>
            <li className="nav-li">
              <NavLink
                activeClassName="active"
                to="/scores"
                className="nav-link"
              >
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-li">
              <div
                className="logout"
                onClick={handleLogout}
                className="nav-link"
              >
                Log Out
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="nav-li">
              <NavLink
                activeClassName="active"
                to="/signup"
                className="nav-link"
              >
                Signup
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink
                activeClassName="active"
                to="/login"
                className="nav-link"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
    </div>
  );
}

export default Header;
