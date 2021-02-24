import Timer from "./Timer";

function InfoBar({ seconds, setSeconds, timerIsActive, setTimerIsActive, startTimer, resetTimer, roundScore }) {
    return (
      <div className="info-bar">
          <h1>InfoBar Placeholder</h1>
          <Timer 
          seconds={seconds} 
          setSeconds={setSeconds} 
          timerIsActive={timerIsActive} 
          setTimerIsActive={setTimerIsActive}
          startTimer={startTimer}
          resetTimer={resetTimer}
          roundScore={roundScore}
          />
          <div className="round-score-div">
              <h4>Round Score</h4>
              <div>
                  {roundScore}
              </div>
          </div>
      </div>
    );
  }
  
  export default InfoBar;