import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import InfoBar from "./InfoBar";
import Anagrams from "./Anagrams";
import GuessForm from "./GuessForm";
import FoundWords from "./FoundWords";
import EndRoundModal from "./EndRoundModal";
import WrongGuessModal from "./WrongGuessModal";
import soundfile from "../assets/109662__grunz__success.mp3";
import soundfiletwo from "../assets/109662__grunz__success.wav";
import correctSound from "../assets/correct-choice.wav";
import gameOverSound from "../assets/game-over.mp3";
import wrongSound from "../assets/wrong-buzz.wav";

function AntonymGameContainer({ currentUser, userGamesList, showHelpModal }) {
  const [currentGame, setCurrentGame] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [currentHeadword, setCurrentHeadword] = useState(null);
  const [currentPartOfSpeech, setCurrentPartOfSpeech] = useState(null);
  const [currentSynonyms, setCurrentSynonyms] = useState([]);
  const [currentAnagrams, setCurrentAnagrams] = useState([]);
  const [foundSynonyms, setFoundSynonyms] = useState([]);
  const [wordIdsUsed, setWordIdsUsed] = useState([]);

  const [roundScore, setRoundScore] = useState(0);

  const [guess, setGuess] = useState("");
  const [guessAlert, setGuessAlert] = useState("");
  const [guessFormDisabled, setGuessFormDisabled] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showWrongGuessModal, setShowWrongGuessModal] = useState(false);

  //Timer State
  const [seconds, setSeconds] = useState(30);
  const [timerIsActive, setTimerIsActive] = useState(false);

  function handleNewGameClick() {
    setCurrentRound(0);
    console.log(wordIdsUsed);
    // Create new game
    fetch("http://localhost:3001/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        score: 0,
        category: "antonym",
      }),
    })
      .then((response) => response.json())
      .then((newGameObj) => {
        console.log("New Game Object:", newGameObj);
        setCurrentGame(newGameObj);
        // console.log(currentRound)
        setGameScore(newGameObj.score);
        startNewRound(newGameObj);
      });
  }

  function startNewRound(newGame) {
    // console.log(currentGame);
    let newGameId = newGame.id;
    let randAntId = null;
    let i = 0;
    do {
      i += 1;
      randAntId = Math.ceil(Math.random() * 7);
      console.log({ randAntId, i });
    } while (checkIfWordIsRepeat(randAntId));
    console.log(randAntId);
    fetch("http://localhost:3001/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        antonym_id: randAntId,
        game_id: newGameId,
        score: 0,
      }),
    })
      .then((response) => response.json())
      .then((newRoundObj) => {
        // console.log("New Round Object", newRoundObj);
        let usedAntId = randAntId;
        setWordIdsUsed([...wordIdsUsed, usedAntId]);
        console.log(wordIdsUsed);
        getNewWord(randAntId);
        // let newRoundNum = currentRound + 1
        // setCurrentRound(newRoundNum)
      });
  }

  function checkIfWordIsRepeat(randAntId) {
    return wordIdsUsed.includes(randAntId);
  }

  function checkIfWordIsMissingAntonyms(randAntId){
    let missingAnts = true
    fetch(`http://localhost:3001/antonyms/${randAntId}`)
      .then((response) => response.json())
      .then((word) => {
        if (word.antonyms) {
          missingAnts = false
        }
      });
      return missingAnts
  }

  function getNewWord(wordId) {
    fetch(`http://localhost:3001/antonyms/${wordId}`)
      .then((response) => response.json())
      .then((word) => {
        console.log(word);
        setCurrentHeadword(word.headword.toUpperCase());
        setCurrentPartOfSpeech(word.part_of_speech);
        setGuessFormDisabled(false);
        resetTimer();
        setRoundScore(0);
        setFoundSynonyms([]);
        createSynObjs(word.antonyms);
        setGuess("");
        startTimer();
        let newRoundNum = currentRound + 1;
        // setCurrentRound(currentRound + 1)
        setCurrentRound((prevRoundValue) => prevRoundValue + 1);
      });
  }

  function createSynObjs(synsArray) {
    const slicedSynsArray = synsArray.slice(0, 12)
    const synsObjs = slicedSynsArray.map((syn) => {
      return {
        syn: syn.toUpperCase(),
        anagram: syn.toUpperCase(),
        isFound: false,
      };
    });
    setCurrentSynonyms(synsObjs);
    createAnagramObjs(synsObjs);
  }

  function createAnagramObjs(synsToScramble) {
    const anagrams = synsToScramble.map((syn) => {
      let anagram = scramble(syn.anagram);
      return { syn: syn.syn, anagram: anagram, isFound: false };
    });
    setCurrentAnagrams(anagrams);
  }

  function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  function scramble(word) {
    let arr = word.split("");
    let n = arr.length;

    for (let i = 0; i < n - 1; ++i) {
      let j = getRandomInt(n);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    let newWord = arr.join("");
    return newWord;
  }

  //-----------Timer Functions------------------

  function startTimer() {
    setTimerIsActive(!timerIsActive);
  }

  function stopTimer() {
    setTimerIsActive(!timerIsActive);
    endRound();
  }

  function resetTimer() {
    setSeconds(30);
    setTimerIsActive(false);
  }

  function showEndRoundModal() {
    if (foundSynonyms.length === 0) {
      playGameOverSound()
    }
    setShowModal(true);
  }

  function endRound() {
    let newGameScore = gameScore + roundScore;
    setGameScore(newGameScore);
    setGuessFormDisabled(true);
    showEndRoundModal();
    saveFinalScore();
    //Initiate modal with round score, game score, words guessed, etc.
    //Adds round score to game score
    //create play button that starts a new round
  }

  function saveFinalScore() {
    console.log(gameScore);
    fetch(`http://localhost:3001/games/${currentGame.id}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: gameScore }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  }

  function showUnfoundWords() {}

  //-------------Guess Functions-------------------

  function checkForMatches(currentGuess) {
    let foundMatch = false;

    currentAnagrams.forEach((anagram) => {
      if (currentGuess === anagram["syn"] && anagram["isFound"] === false) {
        anagram["isFound"] = true;
        foundMatch = true;
        // console.log(anagram)
        let newRoundScore = roundScore + 100;
        setRoundScore(newRoundScore);
        let newFoundSyns = [...foundSynonyms, anagram];
        setFoundSynonyms(newFoundSyns);
        let newAnagrams = currentAnagrams.filter((anagram) => {
          return anagram["syn"] !== currentGuess;
        });
        setCurrentAnagrams(newAnagrams);
        playCorrectSound();
      }
    });
    // console.log(currentSynonyms.length, foundSynonyms.length)
    // if (currentSynonyms.length === foundSynonyms.length) {
    //     let won = "You guessed all the words!"
    //     setGuessAlert(won)
    // }
    // console.log(currentAnagrams)
    // if (currentAnagrams.length === 0) {
    //     let won = "You guessed all the words!"
    //     setGuessAlert(won)
    // }
    if (foundMatch === false && currentGuess) {
      console.log(currentGuess);
      playWrongSound()
      setShowWrongGuessModal(true);
      setTimeout(function () {
        setShowWrongGuessModal(false);
      }, 1500);
    }
  }

  useEffect(() => {
    if (
      foundSynonyms.length === currentSynonyms.length &&
      foundSynonyms.length !== 0
    ) {
      // let won = "You guessed all the words!"
      // setGuessAlert(won)
      // playWinSound()
      // let bonusScore = roundScore + 500
      // setRoundScore(bonusScore)
      stopTimer();
      showEndRoundModal();
      playWinSound();
    }
  }, [foundSynonyms]);

  ////Sound Effects

  //   const winSoundUrl = "%PUBLIC_URL%/109662__grunz__success.mp3"

  const [playWinSound] = useSound(soundfiletwo, {volume: 0.15 });
  const [playWrongSound] = useSound(wrongSound, {volume: 0.15 })
  const [playCorrectSound] = useSound(correctSound, {volume: 0.15 });
  const [playGameOverSound] = useSound(gameOverSound, { volume: 0.15})

  return (
    <div className={showModal || showHelpModal ? "outer-game-container-fade": "outer-game-container"}>
      <div className="game-container">
        <InfoBar
          seconds={seconds}
          setSeconds={setSeconds}
          timerIsActive={timerIsActive}
          setTimerIsActive={setTimerIsActive}
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          roundScore={roundScore}
          currentRound={currentRound}
          gameScore={gameScore}
        />
        <div className="headword-and-guess-div">
          <WrongGuessModal
            showWrongGuessModal={showWrongGuessModal}
            setShowWrongGuessModal={setShowWrongGuessModal}
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
          <EndRoundModal
            showModal={showModal}
            setShowModal={setShowModal}
            gameScore={gameScore}
            roundScore={roundScore}
            foundSynonyms={foundSynonyms}
            anagrams={currentAnagrams}
            startNewRound={startNewRound}
            currentGame={currentGame}
            handleNewGameClick={handleNewGameClick}
            setCurrentRound={setCurrentRound}
            currentRound={currentRound}
            setWordIdsUsed={setWordIdsUsed}
          />
          {currentGame ? (
            <GuessForm
              currentUser={currentUser}
              currentGame={currentGame}
              guess={guess}
              setGuess={setGuess}
              checkForMatches={checkForMatches}
              guessAlert={guessAlert}
              guessFormDisabled={guessFormDisabled}
            />
          ) : (
            <div></div>
          )}
        </div>
        {currentGame ? (
          <Anagrams
            synonyms={currentSynonyms}
            anagrams={currentAnagrams}
            showModal={showModal}
          />
        ) : (
          <div></div>
        )}
        {currentGame ? (
          <FoundWords
            foundSynonyms={foundSynonyms}
            showModal={showModal}
            anagrams={currentAnagrams}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default AntonymGameContainer;
