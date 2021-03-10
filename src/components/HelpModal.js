import React from "react";

function HelpModal({ showHelpModal, setShowHelpModal }) {


    function handleClose() {
        setShowHelpModal(false);
    }

    const toRender = showHelpModal ? (
      <div className ="modal-wrapper">
        <div className="help-modal" style={{ opacity: 1 }}>
          <div className="inner-help-modal">
            <h4>How to play</h4>
            <p>Try to guess all synonyms for the given keyword</p>
            <p>Hint: The Anagrams list shows scrambled versions of each synonym</p>
            <p>Earn points for each correct guess</p>
            <p>You must correctly guess at least two synonyms to move on to the next round!</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
      ) : (
        null
      );

    return toRender
  }

  export default HelpModal;