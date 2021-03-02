import React, { useState } from "react";

function GuessForm({
  currentUser,
  currentGame,
  guess,
  setGuess,
  checkForMatches,
  guessAlert,
  guessFormDisabled
}) {
  function handleChange(e) {
    let newGuess = e.target.value.toUpperCase();
    setGuess(newGuess);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let capGuess = guess.toUpperCase()
    checkForMatches(capGuess);
    setGuess("");
  }

  const toRender = currentGame ? (
    <div className="guess-form-outer-div" >
      <div className="guess-form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            autofocus="true"
            autoselect="true"
            className="guess-form-input"
            type="text"
            name="guess"
            value={guess}
            onChange={handleChange}
            disabled={guessFormDisabled}
          />
          <br></br>
          <input className="login-btn" type="submit" value="GUESS"/>
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
