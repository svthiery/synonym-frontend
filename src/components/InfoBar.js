import Timer from "./Timer";

function InfoBar({ seconds, setSeconds, timerIsActive, setTimerIsActive, startTimer, resetTimer }) {
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
          />
      </div>
    );
  }
  
  export default InfoBar;