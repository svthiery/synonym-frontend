function Anagrams({ synonyms, anagrams }) {

    // const synObjs = synonyms.map(syn => {
    //     return {"syn": syn, "isFound": false}
    // })

    const synList = anagrams.map(anagram => {
        return (
            <div>
                {anagram.anagram}
            </div>
        );
    })

    return (
      <div className="anagrams">
          <h1>Anagrams</h1>
          <div>{synList}</div>
      </div>
    );
  }
  
  export default Anagrams;