import React, { useEffect } from "react";

function GuessForm({
  currentGame,
  guess,
  setGuess,
  checkForMatches,
  guessAlert,
  guessFormDisabled,
  showModal,
  showHelpModal,
}) {
  function handleChange(e) {
    let newGuess = e.target.value.toUpperCase();
    setGuess(newGuess);
  }

  function handleSubmit(e) {
    // console.log(e);
    e.preventDefault();
    let capGuess = guess.toUpperCase();
    checkForMatches(capGuess);
    setGuess("");
  }

  useEffect(() => {
    let guessInput = document.querySelector(".guess-form-input");
    guessInput.focus();
  }, [guessFormDisabled]);

  // Microphone

  const sdk = require("microsoft-cognitiveservices-speech-sdk");
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "de62f611b6e44532ac74fcb92e019042",
    "eastus"
  );

  function fromMic() {
    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    // console.log(audioConfig);
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // console.log("Speak into your microphone.");
    recognizer.recognizeOnceAsync((result) => {
      // console.log(`RECOGNIZED: Text=${result.text}`);
      if (result.text) {
        let textGuess = result.text.toUpperCase();
        let newGuess = textGuess.substring(0, textGuess.length - 1);
        setGuess(newGuess);
        setTimeout(function () {
          setGuess("");
        }, 1500);
        checkForMatches(newGuess);
      }
    });
  }

  const toRender = currentGame ? (
    <div className="guess-form-outer-div">
      <div className="guess-form">
        <form onSubmit={handleSubmit} autoComplete="off" className="form">
          <input
            autoFocus="true"
            autoselect="true"
            className="guess-form-input"
            type="text"
            name="guess"
            value={guess}
            onChange={handleChange}
            disabled={guessFormDisabled}
          />
          <br></br>
          <input
            className={
              showModal || showHelpModal ? "login-btn-fade" : "login-btn"
            }
            type="submit"
            value="GUESS"
          />
          <button
            onClick={fromMic}
            className={
              showModal || showHelpModal ? "login-btn-fade" : "login-btn"
            }
          >
            🎤
          </button>
        </form>
      </div>
      <div>{guessAlert}</div>
    </div>
  ) : (
    <div></div>
  );

  return toRender;
}

export default GuessForm;
