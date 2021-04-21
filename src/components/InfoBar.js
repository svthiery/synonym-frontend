import Timer from "./Timer";

function InfoBar({
  seconds,
  setSeconds,
  timerIsActive,
  setTimerIsActive,
  startTimer,
  stopTimer,
  resetTimer,
  roundScore,
  currentRound,
  gameScore,
  setGameScore
}) {
  return (
    <div className="info-bar">
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        timerIsActive={timerIsActive}
        setTimerIsActive={setTimerIsActive}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
        roundScore={roundScore}
        gameScore={gameScore}
        setGameScore={setGameScore}
      />
      <div className="round-score-div">
        <h4>ROUND SCORE</h4>
        <div>{roundScore}</div>
      </div>
      <div className="current-round-div">
        <h4>ROUND</h4>
        <div>{currentRound}</div>
      </div>
      <div className="current-round-div">
        <h4>GAME SCORE</h4>
        <div>{gameScore}</div>
      </div>
    </div>
  );
}

export default InfoBar;
