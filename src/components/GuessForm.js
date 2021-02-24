import React, { useState } from "react";

function GuessForm({ currentUser, currentGame, guess, setGuess, checkForMatches }) {

    function handleChange(e) {
        let newGuess = e.target.value
        setGuess(newGuess)
    }

    function handleSubmit(e) {
        e.preventDefault();
        checkForMatches(guess)
        setGuess("")
    }

    const toRender = currentGame ? (
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
      ) : <div></div>

    return toRender
  }
  
  export default GuessForm;