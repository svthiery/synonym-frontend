import React, { useState, useEffect } from "react";

function Timer({ seconds, setSeconds, timerIsActive, setTimerIsActive, startTimer, stopTimer, resetTimer }) {

    //-----Original timer function
//   useEffect(() => {
//     let interval = null;
//     if (timerIsActive) {
//       interval = setInterval(() => {
//         setSeconds(seconds => seconds - 1);
//       }, 1000);
//     } else if (!timerIsActive && seconds !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timerIsActive, seconds]);

  useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      if (seconds === 0) {
        stopTimer()
      }
    } else if (!timerIsActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerIsActive, seconds]);


  return (
    <div className="timer">
        <h4>TIMER</h4>
      <div className="time">{seconds} seconds</div>
      <div className="row">
        {/* <button
          className={`button button-primary button-primary-${
            timerIsActive ? "active" : "inactive"
          }`}
          onClick={startTimer}
        >
          {timerIsActive ? "Pause" : "Start"}
        </button>
        <button className="button-secondary" onClick={resetTimer}>Reset</button> */}
      </div>
    </div>
  );
}

export default Timer;
