import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem, Select } from "@material-ui/core";
import { Frequency, TongType } from "../const";

const initialState = {
  tong_name: "",
  tong_type: "",
  tong_date: "",
  tong_frequency: "",
};

export function CreateTong({ submitTong }) {
  const [state, setState] = useState({ ...initialState });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitTong({ ...state, id: Date.now() });
    setState({ ...initialState });
  };

  return (
    <div className="create-tong">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          name="tong_name"
          label="TongName"
          value={state.tong_name}
          onChange={handleChange}
        />
        <Select
          labelId="TongType"
          label="TongType"
          value={state.tong_type}
          name="tong_type"
          onChange={handleChange}
        >
          {TongType.map((node, index) => {
            return (
              <MenuItem key={index} value={Object.keys(node)[0]}>
                {Object.keys(node)[0]}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          id="tong-date"
          label="TongDate"
          type="datetime-local"
          name="tong_date"
          InputLabelProps={{
            shrink: true,
          }}
          value={state.tong_date}
          onChange={handleChange}
        />
        <Select
          labelId="TongFrequency"
          label="TongFrequency"
          value={state.tong_frequency}
          name="tong_frequency"
          onChange={handleChange}
        >
          {Frequency.map((node, index) => {
            return (
              <MenuItem key={index} value={Object.keys(node)[0]}>
                {Object.keys(node)[0]}
              </MenuItem>
            );
          })}
        </Select>
        <Button type="submit" variant="outlined" color="primary">
          Create Tong
        </Button>
      </form>
    </div>
  );
}
