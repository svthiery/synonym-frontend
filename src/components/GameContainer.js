import React, { useEffect, useState } from "react";
import InfoBar from "./InfoBar";
import Anagrams from "./Anagrams";
import GuessForm from "./GuessForm";

function GameContainer({ currentUser }) {
  const [currentGame, setCurrentGame] = useState(null);
  const [currentHeadword, setCurrentHeadword] = useState(null);
  const [currentPartOfSpeech, setCurrentPartOfSpeech] = useState(null);
  const [currentSynonyms, setCurrentSynonyms] = useState([]);

  const [roundScore, setRoundScore] = useState(0);

  const [guess, setGuess] = useState("")

  //Timer State
  const [seconds, setSeconds] = useState(60);
  const [timerIsActive, setTimerIsActive] = useState(false);

  function handleNewGameClick() {
    // Create new game
    fetch("http://localhost:3001/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: currentUser.id }),
    })
      .then((response) => response.json())
      .then((newGameObj) => {
        console.log("Success:", newGameObj);
        setCurrentGame(newGameObj);
        startNewRound(newGameObj);
      });
  }

  function startNewRound(newGame) {
    console.log(currentGame);
    let newGameId = newGame.id;
    let randWordId = 1;
    fetch("http://localhost:3001/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word_id: randWordId,
        game_id: newGameId,
        score: roundScore,
      }),
    })
      .then((response) => response.json())
      .then((newGameObj) => {
        console.log("Success:", newGameObj);
        getNewWord(randWordId);
      });
  }

  function getNewWord(wordId) {
    fetch(`http://localhost:3001/words/${wordId}`)
      .then((response) => response.json())
      .then((word) => {
        // console.log(word);
        setCurrentHeadword(word.headword);
        setCurrentPartOfSpeech(word.part_of_speech);
        setCurrentSynonyms(word.synonyms);
        startTimer()
      });
  }

  //-----------Timer Functions------------------

  function startTimer() {
    setTimerIsActive(!timerIsActive);
  }

  function resetTimer() {
    setSeconds(60);
    setTimerIsActive(false);
  }

  return (
    <div className="outer-game-container">
      <div className="game-container">
        <InfoBar
          seconds={seconds}
          setSeconds={setSeconds}
          timerIsActive={timerIsActive}
          setTimerIsActive={setTimerIsActive}
          startTimer={startTimer}
          resetTimer={resetTimer}
        />
        <div className="headword-div">
          <div className="current-word">{currentHeadword}</div>
          <div className="current-part-of-speech">{currentPartOfSpeech}</div>
          {currentGame ? (
            <div></div>
          ) : (
            <button onClick={handleNewGameClick}>Play</button>
          )}
        </div>
        <GuessForm currentUser={currentUser} currentGame={currentGame} guess={guess} setGuess={setGuess}/>
        <Anagrams synonyms={currentSynonyms} />
      </div>
    </div>
  );
}

export default GameContainer;
