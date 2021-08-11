import React, { useEffect, useRef } from "react";

function GuessForm({
  currentGame,
  guess,
  setGuess,
  checkForMatches,
  guessFormDisabled,
  showModal,
  showHelpModal,
  showWrongGuessModal
}) {

  // Use ref to bring refocus on guess form after any modal closes and if no other modal is open
  let guessInput = useRef(null)

  useEffect(() => {
    if(!showHelpModal && !showWrongGuessModal && !showModal && !guessFormDisabled) {
    guessInput.current.focus()
  }
  }, [showHelpModal, showWrongGuessModal, showModal, guessFormDisabled, guessInput]);

  // ----------------- MICROPHONE ----------------------------------

  const sdk = require("microsoft-cognitiveservices-speech-sdk");
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "de62f611b6e44532ac74fcb92e019042",
    "eastus"
  );

  function fromMic() {
    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync((result) => {
      if (result.text) {
        let rawGuess = result.text.toUpperCase();
        // the API adds a period at the end of guesses. We need to strip it.
        let cleanedGuess = rawGuess.substring(0, rawGuess.length - 1);
        setGuess(cleanedGuess);
        setTimeout(function () {
          setGuess("");
        }, 1500);
        checkForMatches(cleanedGuess);
      }
    });
  }

  // ---------------------------------------------------------------

  if (!currentGame) return null

  const isModalOpen =  showModal || showHelpModal

  return (
    <div className="guess-form-outer-div">
      <div className="guess-form">
        <form 
          autoComplete="off"
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            let capGuess = guess.toUpperCase();
            checkForMatches(capGuess);
            setGuess("");
            }
          } 
          >
          <input
            autofocus="true"
            className="guess-form-input"
            disabled={guessFormDisabled}
            name="guess"
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            ref={guessInput}
            type="text"
            value={guess}
          />
          <br></br>
          <input
            className={
              isModalOpen ? "login-btn-fade" : "login-btn"
            }
            type="submit"
            value="GUESS"
          />
          <button
            className={
              isModalOpen ? "login-btn-fade" : "login-btn"
            }
            onClick={fromMic}
          >
            🎤
          </button>
        </form>
      </div>
    </div>
  )
}

export default GuessForm;
