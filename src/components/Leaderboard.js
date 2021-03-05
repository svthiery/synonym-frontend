function Leaderboard({ games, currentUser }) {

    const gamesList = games.slice(0, 10).map(game => {
        return (
            <li className="high-score-li">
                <div>{game.game_user}</div>
                <div>{game.score}</div>
            </li>
        );
    });

    return (
      <div className="leaderboard">
          <h1>Leaderboard</h1>
          <ul className="leaderboard-ul">{gamesList}</ul>
      </div>
    );
  }
  
  export default Leaderboard;