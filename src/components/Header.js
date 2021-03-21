import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HelpModal from "./HelpModal";
import Avatar from "../assets/free-avatar.svg";

function Header({
  currentUser,
  resetCurrentUser,
  showHelpModal,
  setShowHelpModal,
  showModal,
}) {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem("token");
    resetCurrentUser(null);
    history.push("/");
  }

  function handleHelp() {
    setShowHelpModal(true);
  }

  return (
    <div>
      <div className={showHelpModal || showModal ? "header-fade" : "header"}>
        {/* <h1 className="header-name">Synonym</h1> */}
        <ul className={showHelpModal || showModal ? "nav-bar-fade" : "nav-bar"}>
          {/* <li className="nav-li"><h1 className="nav-heading-name">Synonym</h1></li> */}
          <li className="nav-li">
            <NavLink
              exact
              activeClassName="active"
              to="/"
              className={
                showHelpModal || showModal ? "nav-link-fade" : "nav-link"
              }
            >
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
              {/* <li className="nav-li">
                <div
                  className={showHelpModal || showModal ? "profile-fade" : "profile"}
                >
                  <div className="circle">
                    <div className="user-initial"><img className ="profile-pic" src={currentUser.profile_img || "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"}></img></div>
                  </div>
                </div>
              </li> */}
              <li className="nav-li">
                <div
                  className="logout"
                  onClick={handleLogout}
                  className={
                    showHelpModal || showModal ? "nav-link-fade" : "nav-link"
                  }
                >
                  Log Out
                </div>
              </li>
              <li className="nav-li">
                <div
                  className="help"
                  onClick={handleHelp}
                  className={
                    showHelpModal || showModal ? "nav-link-fade" : "nav-link"
                  }
                >
                  Help
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-li">
                <NavLink
                  activeClassName="active"
                  to="/signup"
                  className={
                    showHelpModal || showModal ? "nav-link-fade" : "nav-link"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-li">
                <NavLink
                  activeClassName="active"
                  to="/login"
                  className={
                    showHelpModal || showModal ? "nav-link-fade" : "nav-link"
                  }
                >
                  Log In
                </NavLink>
              </li>
              <li className="nav-li">
                <div
                  className="help"
                  onClick={handleHelp}
                  className={
                    showHelpModal || showModal ? "nav-link-fade" : "nav-link"
                  }
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
