function UserScores({ currentUser, games, showHelpModal }) {
  const userGamesList = games.slice(0, 10).filter((game) => {
    return game.user_id === currentUser.id;
  });

  const userGamesListShort = userGamesList.map((game) => {
    return <div className="indv-user-score">{game.score}</div>;
  });

  return (
    <div className={showHelpModal ? "user-scores-fade" : "user-scores"}>
      <h2>Your High Scores</h2>
      <div>{userGamesListShort}</div>
    </div>
  );
}

export default UserScores;
