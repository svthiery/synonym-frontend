function Leaderboard({ games, currentUser }) {

    const gamesList = games.slice(0, 4).map(game => {
        console.log(game.game_user)
        return (
            <div>
                <div>{game.game_user}</div>
                <div>{game.score}</div>
            </div>
        );
    });

    return (
      <div className="leaderboard">
          <h1>Leaderboard</h1>
          <div>{gamesList}</div>
      </div>
    );
  }
  
  export default Leaderboard;