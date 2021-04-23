import ReactLoading from 'react-loading';

function UserScores({ currentUser, games, showHelpModal, isScoresLoading }) {
  const userGamesList = games.filter((game) => {
    return game.user_id === currentUser.id;
  }).slice(0, 10);

  const userGamesListShort = userGamesList.map((game) => {
    return <div key={game.id} className="indv-user-score">{game.score}</div>;
  });

  return (
    <div className={showHelpModal ? "user-scores-fade" : "user-scores"}>
      <h2>Your High Scores</h2>
      {isScoresLoading ? <ReactLoading type={"bubbles"} color={"grey"} className="loading"/> : <div>{userGamesListShort}</div>}
    </div>
  );
}

export default UserScores;
