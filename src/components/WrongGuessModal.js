import React from "react";

function WrongGuessModal({ showWrongGuessModal, setShowWrongGuessModal }) {
  function handleClose() {
    setShowWrongGuessModal(false);
  }

  const toRender = showWrongGuessModal ? (
    <div className="wrong-guess-modal">
      <p>NOT A VALID WORD</p>
    </div>
  ) : null;

  return toRender;
}

export default WrongGuessModal;
