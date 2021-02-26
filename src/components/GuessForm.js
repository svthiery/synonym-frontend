import React, { useState } from "react";

function GuessForm({
  currentUser,
  currentGame,
  guess,
  setGuess,
  checkForMatches,
  guessAlert,
}) {
  function handleChange(e) {
    let newGuess = e.target.value;
    setGuess(newGuess);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let capGuess = guess.toUpperCase()
    checkForMatches(capGuess);
    setGuess("");
  }

  const toRender = currentGame ? (
    <div>
      <div className="guess-form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <label>Guess synonyms here:</label>
          <input
            type="text"
            name="guess"
            value={guess}
            onChange={handleChange}
          />
          <input className="login-btn" type="submit" value="Guess" />
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
