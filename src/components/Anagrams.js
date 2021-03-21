function Anagrams({ synonyms, anagrams }) {
  const synList = anagrams.map((anagram) => {
    return <div className="anagram-div">{anagram.anagram.toUpperCase()}</div>;
  });

  return (
    <div className="anagrams">
      <h1>Anagrams</h1>
      <div>{synList}</div>
    </div>
  );
}

export default Anagrams;
