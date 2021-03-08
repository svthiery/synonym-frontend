function Leaderboard({ games, currentUser, showHelpModal }) {

    const gamesList = games.slice(0, 10).map(game => {
        return (
            <li className={showHelpModal ? "high-score-li-fade" : "high-score-li"}>
                <div>{game.game_user}</div>
                <div>{game.score}</div>
            </li>
        );
    });

    return (
      <div className={showHelpModal ? "leaderboard-fade" : "leaderboard"}>
          <h1>Leaderboard</h1>
          <ul className={showHelpModal ? "leaderboard-ul-fade" : "leaderboard-ul"}>{gamesList}</ul>
      </div>
    );
  }
  
  export default Leaderboard;