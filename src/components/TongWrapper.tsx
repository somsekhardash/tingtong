import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import { CreateTong } from "./CreateTong";
import { TingNode } from "./TingNode";
import { Tong } from "./Tong";

export function TongWrapper({ tongs, saveTong, createTong, createTing }) {
  const [open, setOpen] = useState(false);
  const markDone = (tong) => {
    switch (tong.tong_frequency) {
      case "daily":
        saveTong({
          ...tong,
          tong_date: moment(tong.tong_date)
            .add(1, "days")
            .format("YYYY-MM-DDTHH:mm"),
        });
        break;
      case "month":
        saveTong({
          ...tong,
          tong_date: moment(tong.tong_date)
            .add(1, "months")
            .format("YYYY-MM-DDTHH:mm"),
        });
        break;
      case "year":
        saveTong({
          ...tong,
          tong_date: moment(tong.tong_date)
            .add(1, "years")
            .format("YYYY-MM-DDTHH:mm"),
        });
        break;
      default:
        saveTong({
          ...tong,
          tong_date: moment(tong.tong_date)
            .add(1, "hours")
            .format("YYYY-MM-DDTHH:mm"),
        });
        break;
    }
  };

  return (
    <div className="App">
      {/* {Array.isArray(tongs) &&
        tongs.map(
          (tong, index) =>
            tong && <Tong key={index} tong={tong} saveTingTon={saveTong} />
        )} */}
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
      <div className="tings">
        {Array.isArray(tongs) &&
          tongs.map((tong, index) => {
            if (tong) {
              const time = new Date(tong.tong_date);
              time.setSeconds(time.getSeconds());
              return (
                <div className="top" key={`tong-${index}`}>
                  <Tong tong={tong} saveTong={saveTong} />
                  <TingNode
                    tong={tong}
                    time={time}
                    expiryTimestamp={time}
                    markDone={markDone}
                    createTing={createTing}
                  />
                </div>
              );
            }
          })}
      </div>
      <Fab aria-label="like" size="small" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      {Array.isArray(tongs) && (
        <Fab aria-label="like" size="small" onClick={() => saveTong()}>
          <FavoriteIcon />
        </Fab>
      )}
    </div>
  );
}
