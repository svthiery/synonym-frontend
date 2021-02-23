import '../App.css';
import Header from "./Header";
import HomeContainer from "./HomeContainer";
import Login from "./Login";
import GameContainer from "./GameContainer";
import Leaderboard from "./Leaderboard";
import UserScores from "./UserScores";

function App() {
  return (
    <div className="App">
      <Header />
      <HomeContainer />
      <Login />
      <GameContainer />
      <Leaderboard />
      <UserScores />
    </div>
  );
}

export default App;
