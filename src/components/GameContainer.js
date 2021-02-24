import React, { useEffect, useState } from "react";
import InfoBar from "./InfoBar";
import Anagrams from "./Anagrams";
import GuessForm from "./GuessForm";

function GameContainer({ currentUser }) {
    
  const [currentGame, setCurrentGame] = useState(null);

  function handleNewGameClick() {
    // Create new game 
    fetch('http://localhost:3001/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"user_id": currentUser.id}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
  }

  return (
    <div className="outer-game-container">
      <div className="game-container">
        <InfoBar />
        <div className="headword-div">
            {currentGame ? <div></div> : <button onClick={handleNewGameClick}>Play</button>}
        </div>
        <GuessForm />
        <Anagrams />
      </div>
    </div>
  );
}

export default GameContainer;
