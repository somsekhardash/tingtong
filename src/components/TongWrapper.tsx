import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import { CreateTong } from "./CreateTong";
import { Ting } from "./Ting";
import { Tong } from "./Tong";

export function TongWrapper({ tongs, saveTingTong, createTong }) {
  const [open, setOpen] = useState(false);
  const markDone = (tong) => {
    if (tong.tong_frequency === "daily")
      saveTingTong({
        ...tong,
        tong_date: moment(tong.tong_date)
          .add(1, "days")
          .format("YYYY-MM-DDTHH:mm"),
      });
    else if (tong.tong_frequency === "month")
      saveTingTong({
        ...tong,
        tong_date: moment(tong.tong_date)
          .add(1, "months")
          .format("YYYY-MM-DDTHH:mm"),
      });
    else if (tong.tong_frequency === "year")
      saveTingTong({
        ...tong,
        tong_date: moment(tong.tong_date)
          .add(1, "years")
          .format("YYYY-MM-DDTHH:mm"),
      });
    else
      saveTingTong({
        ...tong,
        tong_date: moment(tong.tong_date)
          .add(1, "hours")
          .format("YYYY-MM-DDTHH:mm"),
      });
  };

  return (
    <div className="App">
      {Array.isArray(tongs) &&
        tongs.map(
          (tong, index) =>
            tong && <Tong key={index} tong={tong} saveTingTon={saveTingTong} />
        )}
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Dong</DialogTitle>
        <DialogContent>
          <CreateTong submitTong={createTong} />
        </DialogContent>
      </Dialog>
      <Fab aria-label="like" size="small" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      {Array.isArray(tongs) && (
        <Fab aria-label="like" size="small" onClick={() => saveTingTong()}>
          <FavoriteIcon />
        </Fab>
      )}
      <div className="tings">
        {Array.isArray(tongs) &&
          tongs.map((tong, index) => {
            if (tong) {
              const time = new Date(tong.tong_date);
              time.setSeconds(time.getSeconds());
              return (
                <Ting
                  key={index}
                  tong={tong}
                  time={time}
                  expiryTimestamp={time}
                  markDone={markDone}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
