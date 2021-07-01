import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { EditTong } from "./EditTong";

export function Tong({ tong, saveTong }) {
  const { tong_name } = tong;
  const [open, setOpen] = useState(false);

  return (
    <div className="edit-tong">
      <span>{tong_name}</span>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => setOpen(!open)}
      >
        <EditRoundedIcon />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => saveTong(tong, true)}
      >
        <DeleteForeverRoundedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Dong</DialogTitle>
        <DialogContent>
          <EditTong tong={tong} setTong={saveTong} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
