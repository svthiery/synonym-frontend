import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import HomeContainer from "./HomeContainer";
import Login from "./Login";
import Signup from "./Signup";
import GameContainer from "./GameContainer";
import Leaderboard from "./Leaderboard";
import UserScores from "./UserScores";
import HelpModal from "./HelpModal";

function App() {
  // const sdk = require("microsoft-cognitiveservices-speech-sdk");
  // console.log(sdk);
  // const speechConfig = sdk.SpeechConfig.fromSubscription(
  //   "de62f611b6e44532ac74fcb92e019042",
  //   "eastus"
  // );

  // function fromMic() {
  //   let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
  //   console.log(audioConfig)
  //   let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  //   console.log("Speak into your microphone.");
  //   recognizer.recognizeOnceAsync((result) => {
  //     console.log(`RECOGNIZED: Text=${result.text}`);

  //   });
  // }

  const [currentUser, setCurrentUser] = useState(null);
  const [games, setGames] = useState([]);

  const [showHelpModal, setShowHelpModal] = useState(false);

  //autologin
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
    fetch("http://localhost:3001/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((user) => {
        console.log(user)
        setCurrentUser(user)
      });
    }
  }, [])

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((response) => response.json())
      .then((gamesArr) => {
        gamesArr.sort((a, b) => b.score - a.score);
        console.log(gamesArr);
        setGames(gamesArr);
      });
  }, []);

  return (
    <div className="app">
      <Router>
        <Header
          currentUser={currentUser}
          resetCurrentUser={setCurrentUser}
          showHelpModal={showHelpModal}
          setShowHelpModal={setShowHelpModal}
        />
        <HelpModal
          showHelpModal={showHelpModal}
          setShowHelpModal={setShowHelpModal}
        />
        <Switch>
          <Route path="/login">
            <Login setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </Route>
          <Route path="/signup">
            <Signup setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/">
            <HomeContainer currentUser={currentUser} games={games} />
            <Leaderboard games={games} currentUser={currentUser} />
          </Route>
          <Route path="/play">
            <GameContainer currentUser={currentUser} />
          </Route>
          {/* <Route path="/scores">
            <Leaderboard games={games} currentUser={currentUser}/>
            { currentUser ? <UserScores games={games} currentUser={currentUser}/> : <div></div>}
          </Route> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
