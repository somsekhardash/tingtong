import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { Createting } from "./CreateTing";
import { Ting } from "./Ting";

export function TingNode({
  time,
  tong,
  expiryTimestamp,
  markDone,
  createTing,
}) {
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
  const [open, setOpen] = useState(false);
  function between(x, min, max) {
    return x >= min && x <= max;
  }

  const tClassname = function (days) {
    switch (true) {
      case between(days, 0, 2):
        return "red";
      case between(days, 3, 10):
        return "orange";
      default:
        return "green";
    }
  };

  const submitTing = (ting) => {
    // markDone(tong);
    createTing(
      new Ting(
        ting.ting_name,
        tong.id,
        ting.ting_amount,
        ting.ting_tag,
        ting.ting_description
      )
    );
  };

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
    <div className={`ting-wrapper ${tClassname(days)}`}>
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
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time: any = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */}
      <button onClick={() => setOpen(true)}>Done</button>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Ting</DialogTitle>
        <DialogContent>
          <Createting tong={tong} submitTing={submitTing} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
