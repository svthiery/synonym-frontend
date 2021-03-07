import UserScores from "./UserScores"
import React from "react";
import { useHistory } from "react-router-dom";

function HomeContainer({ games, currentUser }) {

  const history = useHistory();

  function handlePlaySynonym() {
    if (currentUser) {
      history.push("/play");
    } else {
      history.push("/login")
    }
  }

  function handlePlayAntonym() {
    if (currentUser) {
      history.push("/playantonym");
    } else {
      history.push("/login")
    }
  }

  return (
    <div>
      <h1 className="title">Synonym</h1>
      <div className="home-container">
          <div className="home-ant-container" onClick={handlePlayAntonym}>
            <h2>antonym</h2>
            <p className="ant-play-button">>></p>
          </div>
          <div className="home-syn-container" onClick={handlePlaySynonym}>
            <h2>synonym</h2>
            <p className="syn-play-button">>></p>
          </div>
          { currentUser ? <UserScores games={games} currentUser={currentUser} /> : <div></div>}
      </div>
    </div>
  );
}

export default HomeContainer;