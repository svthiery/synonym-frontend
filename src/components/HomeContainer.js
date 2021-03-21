import UserScores from "./UserScores";
import React from "react";
import { useHistory } from "react-router-dom";

function HomeContainer({ games, currentUser, showHelpModal }) {
  const history = useHistory();

  function handlePlaySynonym() {
    if (currentUser) {
      history.push("/play");
    } else {
      history.push("/login");
    }
  }

  function handlePlayAntonym() {
    if (currentUser) {
      history.push("/playantonym");
    } else {
      history.push("/login");
    }
  }

  return (
    <div>
      <h1 className={showHelpModal ? "title-fade" : "title"}>Synonym</h1>
      <div className={showHelpModal ? "home-container-fade" : "home-container"}>
        <div
          className={
            showHelpModal ? "home-ant-container-fade" : "home-ant-container"
          }
          onClick={handlePlayAntonym}
        >
          <h2>Antonym</h2>
          <p className="ant-play-button">>></p>
        </div>
        <div
          className={
            showHelpModal ? "home-syn-container-fade" : "home-syn-container"
          }
          onClick={handlePlaySynonym}
        >
          <h2>Synonym</h2>
          <p className="syn-play-button">>></p>
        </div>
        {currentUser ? (
          <UserScores games={games} currentUser={currentUser} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HomeContainer;
