import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import InfoBar from "./InfoBar";
import Anagrams from "./Anagrams";
import GuessForm from "./GuessForm";
import FoundWords from "./FoundWords";
import EndRoundModal from "./EndRoundModal";
import WrongGuessModal from "./WrongGuessModal";
import winSound from "../assets/109662__grunz__success.wav";
import wrongSound from "../assets/wrong-buzz.wav";
import correctSound from "../assets/correct-choice.wav";
import gameOverSound from "../assets/game-over.mp3";

function GameContainer({
  currentUser,
  showModal,
  setShowModal,
  showHelpModal,
  gameScore,
  setGameScore,
  games,
  setGames
}) {
  const [currentGame, setCurrentGame] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentHeadword, setCurrentHeadword] = useState(null);
  const [currentPartOfSpeech, setCurrentPartOfSpeech] = useState(null);
  const [currentSynonyms, setCurrentSynonyms] = useState([]);
  const [currentAnagrams, setCurrentAnagrams] = useState([]);
  const [foundSynonyms, setFoundSynonyms] = useState([]);
  const [wordIdsUsed, setWordIdsUsed] = useState([]);

  const [roundScore, setRoundScore] = useState(0);

  const [guess, setGuess] = useState("");
  const [guessFormDisabled, setGuessFormDisabled] = useState(false);

  // const [showModal, setShowModal] = useState(false)
  const [showWrongGuessModal, setShowWrongGuessModal] = useState(false);

  //Timer State
  const [seconds, setSeconds] = useState(45);
  const [timerIsActive, setTimerIsActive] = useState(false);

  function handleNewGameClick() {
    setCurrentRound(0);
    fetch(`https://evening-dusk-01854.herokuapp.com/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        score: 0,
        category: "synonym",
      }),
    })
      .then((response) => response.json())
      .then((newGameObj) => {
        const updatedGames = [...games, newGameObj]
        setGames(updatedGames)
        setCurrentGame(newGameObj);
        setGameScore(newGameObj.score);
        startNewRound(newGameObj);
      });
  }

  function startNewRound(newGame) {
    let newGameId = newGame.id;
    let randWordId = null;
    let i = 0;
    do {
      i += 1;
      randWordId = Math.ceil(Math.random() * 179);
      // console.log({ randWordId, i });
    } while (checkWordIsNotRepeat(randWordId));
    // if (checkWordIsNotRepeat(randWordId)) {
    //     randWordId = Math.ceil(Math.random() * 7);
    // }
    // console.log(randWordId);
    fetch(`https://evening-dusk-01854.herokuapp.com/rounds`, {
      // fetch(`http://localhost:3001/rounds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word_id: randWordId,
        game_id: newGameId,
        score: 0,
      }),
    })
      .then((response) => response.json())
      .then((newRoundObj) => {
        // console.log("New Round Object", newRoundObj);
        let usedWordId = randWordId;
        setWordIdsUsed([...wordIdsUsed, usedWordId]);
        // console.log(wordIdsUsed);
        getNewWord(randWordId);
        // let newRoundNum = currentRound + 1
        // setCurrentRound(newRoundNum)
      });
  }

  function checkWordIsNotRepeat(randWordId) {
    return wordIdsUsed.includes(randWordId);
  }

  function getNewWord(wordId) {
    fetch(`https://evening-dusk-01854.herokuapp.com/words/${wordId}`)
      .then((response) => response.json())
      .then((word) => {
        // console.log(word);
        setCurrentHeadword(word.headword.toUpperCase());
        setCurrentPartOfSpeech(word.part_of_speech);
        setGuessFormDisabled(false);
        resetTimer();
        setRoundScore(0);
        setFoundSynonyms([]);
        createSynObjs(word.synonyms);
        setGuess("");
        startTimer();
        let newRoundNum = currentRound + 1;
        // setCurrentRound(currentRound + 1)
        setCurrentRound((prevRoundValue) => prevRoundValue + 1);
      });
  }

  function createSynObjs(synsArray) {
    const slicedSynsArray = synsArray.slice(0, 12);
    const synsObjs = slicedSynsArray.map((syn) => {
      return {
        syn: syn.toUpperCase(),
        anagram: syn.toUpperCase(),
        isFound: false,
      };
    });
    // console.log(synsObjs);
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
    setSeconds(45);
    setTimerIsActive(false);
  }

  function showEndRoundModal() {
    if (foundSynonyms.length === 0) {
      playGameOverSound();
    }
    setShowModal(true);
  }

  function endRound() {
    // console.log(`Round Score: ${roundScore}`);
    // let newGameScore = gameScore + roundScore;
    setGameScore((prevGameScore) => prevGameScore + roundScore);
    // console.log(`Game Score: ${gameScore}`);
    // setGameScore(newGameScore)
    setGuessFormDisabled(true);
    showEndRoundModal();
    // saveFinalScore();
  }

  // function saveFinalScore() {
  //   console.log(`Game Score: ${gameScore}`);
  //   fetch(`https://evening-dusk-01854.herokuapp.com/games/${currentGame.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ score: gameScore }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     });
  // }

  useEffect(() => {
    if (currentGame) {
      // console.log(`Game Score: ${gameScore}`);
      fetch(
        `https://evening-dusk-01854.herokuapp.com/games/${currentGame.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: gameScore }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        });
    }
  }, [gameScore]);

  // function showUnfoundWords() {}

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
    if (foundMatch === false && currentGuess) {
      // console.log(currentGuess);
      setShowWrongGuessModal(true);
      playWrongSound();
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
      setRoundScore((prevRoundScore) => prevRoundScore + 500);
      setGameScore((prevGameScore) => prevGameScore + 500);
      stopTimer();
      showEndRoundModal();
      playWinSound();
    }
  }, [foundSynonyms]);

  ////----------------Sound Effects---------------------------------

  const [playWinSound] = useSound(winSound, { volume: 0.25 });
  const [playWrongSound] = useSound(wrongSound, { volume: 0.25 });
  const [playCorrectSound] = useSound(correctSound, { volume: 0.25 });
  const [playGameOverSound] = useSound(gameOverSound, { volume: 0.25 });

  return (
    <div
      className={
        showModal || showHelpModal
          ? "outer-game-container-fade"
          : "outer-game-container"
      }
    >
      {/* <h1 className={showHelpModal || showModal ? "gamepage-title-fade" : "gamepage-title"}>Synonym</h1> */}
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
          setGameScore={setGameScore}
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
              guessFormDisabled={guessFormDisabled}
              showModal={showModal}
              showHelpModal={showHelpModal}
              showWrongGuessModal={showWrongGuessModal}
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

export default GameContainer;
