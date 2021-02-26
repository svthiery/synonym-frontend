function FoundWords({foundSynonyms}) {

    const synList = foundSynonyms.map(synonym => {
        return (
            <div className="synonym-div">
                {synonym.syn.toUpperCase()}
            </div>
        );
    })

    return (
      <div className="found-words">
          <h1>Found Words</h1>
          <div>{synList}</div>
      </div>
    );
  }
  
  export default FoundWords;