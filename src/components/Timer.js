import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(60);
    setIsActive(false);
  }

  return (
    <div className="timer">
      <div className="time">{seconds} seconds</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button-secondary" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
