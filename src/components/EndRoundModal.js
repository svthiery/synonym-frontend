import React from "react";

function EndRoundModal({
  showModal,
  setShowModal,
  gameScore,
  roundScore,
  foundSynonyms,
  startNewRound,
  currentGame,
  handleNewGameClick,
  userGamesList,
  setCurrentRound,
  currentRound,
  setWordIdsUsed,
}) {
  function handleNextRound() {
    setShowModal(false);
    startNewRound(currentGame);
  }

  function handleNewGame() {
    setCurrentRound(0);
    setWordIdsUsed((prevWordsArr) => []);
    setShowModal(false);
    handleNewGameClick();
  }

  const toRender = showModal ? (
    <div className="end-round-modal">
      {foundSynonyms.length > 1 ? (
        <p className="end-round-message">
          You found {foundSynonyms.length} synonyms!
        </p>
      ) : (
        <p className="end-round-message">Game Over!</p>
      )}
      <p>Game Score: {gameScore}</p>
      <p>Round Score: {roundScore}</p>
      {foundSynonyms.length > 1 ? (
        <button onClick={handleNextRound}>NEXT ROUND</button>
      ) : (
        <button onClick={handleNewGame}>NEW GAME</button>
      )}
    </div>
  ) : null;

  return toRender;
}

export default EndRoundModal;
