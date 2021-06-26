import moment from "moment";
import React from "react";
import { useTimer } from "react-timer-hook";

export function Ting({ time, tong, expiryTimestamp, markDone }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn("onExpire called");
      console.log("I am done");
      console.log("******");
      console.log(tong);
    },
  });

  return (
    // <div style={{ textAlign: "center" }}>
    //   <h1>{tong.tong_name}</h1>
    //   <h2>{moment(time).format("LLL")}</h2>
    //   <div style={{ fontSize: "100px" }}>
    //     <span>{days}d</span>:<span>{hours}h</span>:<span>{minutes}m</span>:
    //     <span>{seconds}s</span>
    //   </div>
    //   <p>{isRunning ? "Running" : "Not running"}</p>
    //   <button onClick={start}>Start</button>
    //   <button onClick={pause}>Pause</button>
    //   <button onClick={resume}>Resume</button>
    //   <button
    //     onClick={() => {
    //       // Restarts to 5 minutes timer
    //       const time: any = new Date();
    //       time.setSeconds(time.getSeconds() + 300);
    //       restart(time);
    //     }}
    //   >
    //     Restart
    //   </button>
    //   <button onClick={() => markDone(tong)}>Done</button>
    // </div>
    <div className="ting-wrapper">
      <div className="clockdiv">
        <div>
          <span className="days">{days}</span>
          <div className="smalltext">days</div>
        </div>
        <div>
          <span className="hours">{hours}</span>
          <div className="smalltext">hours</div>
        </div>
        <div>
          <span className="minutes">{minutes}</span>
          <div className="smalltext">minutes</div>
        </div>
        <div>
          <span className="seconds">{seconds}</span>
          <div className="smalltext">seconds</div>
        </div>
      </div>
    </div>
  );
}
