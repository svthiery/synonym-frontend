import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../App.css';
import Header from "./Header";
import HomeContainer from "./HomeContainer";
import Login from "./Login";
import GameContainer from "./GameContainer";
import Leaderboard from "./Leaderboard";
import UserScores from "./UserScores";

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="app">
      <Router>
        <Header currentUser={currentUser} resetCurrentUser={setCurrentUser}/>
        <Switch>
          <Route path="/login" >
            <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>
          </Route>
          <Route exact path="/">
            <HomeContainer />
            <Leaderboard />
          </Route>
          <Route path="/play">
            <GameContainer currentUser={currentUser}/>
          </Route>
          <Route path="/scores">
            <Leaderboard />
            <UserScores />
          </Route>
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
