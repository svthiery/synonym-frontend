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
  userGamesList
}) {
  function handleNextRound() {
    setShowModal(false);
    startNewRound(currentGame);
  }

  function handleNewGame() {
    setShowModal(false);
    handleNewGameClick();
  }

  const toRender = showModal ? (
    <div className="end-round-modal">
      {foundSynonyms.length > 1 ? (
        <p className="end-round-message">
          Congratulations, you found {foundSynonyms.length} synonyms!
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
// export default class Modal extends React.Component {
//   render() {
//     return <div>Hello Modal</div>;
//   }
// }
