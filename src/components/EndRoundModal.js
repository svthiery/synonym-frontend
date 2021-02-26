import React from "react";

function EndRoundModal({ showModal, setShowModal, gameScore, roundScore, foundSynonyms, startNewRound, currentGame, handleNewGameClick }) {

    function handleNextRound() {
        setShowModal(false)
        startNewRound(currentGame)
    }

    function handleNewGame() {
        setShowModal(false);
        handleNewGameClick()
    }

    const toRender = showModal ? (
        <div className="end-round-modal">
          {foundSynonyms.length > 1 ? <p>Congratulations, you found {foundSynonyms.length} synonyms!</p> : <div>Game Over!</div>}
          <p>Game Score: {gameScore}</p>
          <p>Round Score: {roundScore}</p>
          {foundSynonyms.length > 1 ? <button onClick={handleNextRound}>Next Round</button> : <button onClick={handleNewGame}>New Game</button>}
      </div>
      ) : (
        null
      );

    return toRender
  }

  export default EndRoundModal;
// export default class Modal extends React.Component {
//   render() {
//     return <div>Hello Modal</div>;
//   }
// }