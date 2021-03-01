function FoundWords({foundSynonyms, anagrams, showModal }) {

    const synList = foundSynonyms.map(synonym => {
        return (
            <div className="synonym-div">
                {synonym.syn.toUpperCase()}
            </div>
        );
    })

    const unfoundSynsList = anagrams.map(anagram => {
        return (
            <div className="unfound-word-div">
                {anagram.syn.toUpperCase()}
            </div>
        );
    })

    return (
      <div className="found-words">
          <h1>Found Words</h1>
          <div>{synList}</div>
          {showModal ? <div>{unfoundSynsList}</div> : <div></div>}
      </div>
    );
  }
  
  export default FoundWords;