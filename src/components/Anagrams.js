function Anagrams({ synonyms }) {

    const synList = synonyms.map(syn => {
        return (
            <div>
                {syn}
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