// import Anagram from "./Anagram";

function Anagrams({ synonyms, anagrams }) {

    // const synObjs = synonyms.map(syn => {
    //     return {"syn": syn, "isFound": false}
    // })

    const synList = anagrams.map(anagram => {
        return (
            // <Anagram 
            // key={anagram.syn}
            // anagram={anagram.anagram}
            // syn={anagram.syn}/>
            <div className="anagram-div">
                {anagram.anagram.toUpperCase()}
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