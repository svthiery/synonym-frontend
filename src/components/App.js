import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactLoading from 'react-loading';
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import HomeContainer from "./HomeContainer";
import Login from "./Login";
import Signup from "./Signup";
import GameContainer from "./GameContainer";
import AntonymGameContainer from "./AntonymGameContainer";
import Leaderboard from "./Leaderboard";
import HelpModal from "./HelpModal";

function App() {

  const [isScoresLoading, setIsScoresLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null);
  const [games, setGames] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [gameScore, setGameScore] = useState(0);

  //autologin
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://evening-dusk-01854.herokuapp.com/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          // console.log(user);
          setCurrentUser(user);
        });
    }
    console.log(games)
  }, []);

  useEffect(() => {
    fetch(`https://evening-dusk-01854.herokuapp.com/games`)
      .then((response) => response.json())
      .then((gamesArr) => {
        gamesArr.sort((a, b) => b.score - a.score);
        console.log(gamesArr);
        setGames(gamesArr);
        setIsScoresLoading(false);
      });
  }, [gameScore]);

  return (
    <div className="app">
      <div className={showHelpModal ? "background-fade" : "no-background-fade"}>
        <Router>
          <Header
            currentUser={currentUser}
            resetCurrentUser={setCurrentUser}
            showHelpModal={showHelpModal}
            setShowHelpModal={setShowHelpModal}
            showModal={showModal}
          />
          <HelpModal
            showHelpModal={showHelpModal}
            setShowHelpModal={setShowHelpModal}
          />
          <Switch>
            <Route path="/login">
              <Login
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </Route>
            <Route path="/signup">
              <Signup setCurrentUser={setCurrentUser} />
            </Route>
            <Route exact path="/">
              <HomeContainer
                currentUser={currentUser}
                games={games}
                showHelpModal={showHelpModal}
                isScoresLoading={isScoresLoading}
                setIsScoresLoading={setIsScoresLoading}
              />
              <Leaderboard
                games={games}
                currentUser={currentUser}
                showHelpModal={showHelpModal}
                isScoresLoading={isScoresLoading}
                setIsScoresLoading={setIsScoresLoading}
              />
            </Route>
            <Route path="/play">
              <GameContainer
                currentUser={currentUser}
                showModal={showModal}
                setShowModal={setShowModal}
                showHelpModal={showHelpModal}
                gameScore={gameScore}
                setGameScore={setGameScore}
                games={games}
                setGames={setGames}
              />
            </Route>
            <Route path="/playantonym">
              <AntonymGameContainer
                currentUser={currentUser}
                showHelpModal={showHelpModal}
              />
            </Route>
            {/* <Route path="/scores">
            <Leaderboard games={games} currentUser={currentUser}/>
            { currentUser ? <UserScores games={games} currentUser={currentUser}/> : <div></div>}
          </Route> */}
          </Switch>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
