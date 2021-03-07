import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HelpModal from "./HelpModal"

function Header({ currentUser, resetCurrentUser, showHelpModal, setShowHelpModal }) {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem("token");
    resetCurrentUser(null);
    history.push("/");
  }

  function handleHelp() {
    setShowHelpModal(true)
  }

  return (
      <div>
    <div className="header">
      {/* <h1 className="header-name">Synonym</h1> */}
      <ul className="nav-bar">
          {/* <li className="nav-li"><h1 className="nav-heading-name">Synonym</h1></li> */}
        <li className="nav-li">
          <NavLink exact activeClassName="active" to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        {currentUser ? (
          <>
            {/* <li className="nav-li">
              <NavLink
                activeClassName="active"
                to="/scores"
                className="nav-link"
              >
                Leaderboard
              </NavLink>
            </li> */}
            <li className="nav-li">
              <div
                className="logout"
                onClick={handleLogout}
                className="nav-link"
              >
                Log Out
              </div>
            </li>
            <li className="nav-li">
              <div
                className="help"
                onClick={handleHelp}
                className="nav-link"
              >
                Help
              </div>
            </li>
            <div className="logged-in-as">Logged in as {currentUser.username}</div>
          </>
        ) : (
          <>
            <li className="nav-li">
              <NavLink
                activeClassName="active"
                to="/signup"
                className="nav-link"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink
                activeClassName="active"
                to="/login"
                className="nav-link"
              >
                Log In
              </NavLink>
            </li>
            <li className="nav-li">
              <div
                className="help"
                onClick={handleHelp}
                className="nav-link"
              >
                Help
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
    </div>
  );
}

export default Header;
