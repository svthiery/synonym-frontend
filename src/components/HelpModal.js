import React from "react";

function HelpModal({ showHelpModal, setShowHelpModal }) {


    function handleClose() {
        setShowHelpModal(false);
    }

    const toRender = showHelpModal ? (
        <div className="help-modal">
          <h4>How to play</h4>
          <p>Try to guess all synonyms for the given keyword</p>
          <p>Hint: The Anagrams list shows scrambled versions of each synonym</p>
          <p>Earn points for each correct guess</p>
          <button onClick={handleClose}>Close</button>
      </div>
      ) : (
        null
      );

    return toRender
  }

  export default HelpModal;