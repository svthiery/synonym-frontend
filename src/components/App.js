import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../App.css';
import Header from "./Header";
import HomeContainer from "./HomeContainer";
import Login from "./Login";
import GameContainer from "./GameContainer";
import Leaderboard from "./Leaderboard";
import UserScores from "./UserScores";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <HomeContainer />
            <Leaderboard />
          </Route>
          <Route path="/play">
            <GameContainer />
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
