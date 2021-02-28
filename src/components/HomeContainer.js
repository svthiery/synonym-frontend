import UserScores from "./UserScores"
import React from "react";
import { useHistory } from "react-router-dom";

function HomeContainer({ games, currentUser }) {

  const history = useHistory();

  function handlePlaySynonym() {
    history.push("/play");
  }

  return (
    <div className="home-container">
        <div className="home-ant-container">
          <h2>antonym</h2>
        </div>
        <div className="home-syn-container" onClick={handlePlaySynonym}>
          <h2>synonym</h2>
        </div>
        { currentUser ? <UserScores games={games} currentUser={currentUser}/> : <div></div>}
    </div>
  );
}

export default HomeContainer;