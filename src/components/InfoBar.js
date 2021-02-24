import Timer from "./Timer";

function InfoBar({ seconds, setSeconds, timerIsActive, setTimerIsActive }) {
    return (
      <div className="info-bar">
          <h1>InfoBar Placeholder</h1>
          <Timer 
          seconds={seconds} 
          setSeconds={setSeconds} 
          timerIsActive={timerIsActive} 
          setTimerIsActive={setTimerIsActive}
          />
      </div>
    );
  }
  
  export default InfoBar;