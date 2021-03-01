function UserScores({ currentUser, games }) {

//   if (currentUser) {

    const userGamesList = games.slice(0, 10).filter((game) => {
        return game.user_id === currentUser.id;
      });

    const userGamesListShort = userGamesList.map(game => {
        return (
            <div>
                {game.score}
            </div>
        )
    })
//   }

  return (
    <div className="user-scores">
      <h2>Your High Scores</h2>
      <div>{userGamesListShort}</div>
    </div>
  );
}

export default UserScores;
