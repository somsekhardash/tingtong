import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem, Select } from "@material-ui/core";
import { Frequency, TingType } from "../const";
import { Dropdown } from "semantic-ui-react";

const doptions: any = [
  { key: "English", text: "English", value: "English" },
  { key: "French", text: "French", value: "French" },
];

const initialState = {
  ting_name: "",
  ting_type: "",
  ting_amount: "",
  ting_description: "",
  ting_tag: [],
  ting_options: doptions,
};

export class Createting extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { ...initialState } as any;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      ting_name: this.props.tong.tong_name,
      ting_type: this.props.tong.tong_type,
      ting_amount: this.props.tong.tong_amount || 0,
      ting_description: "",
      ting_tag: this.props.tong.tong_tag || [],
    });
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.submitTing(this.state);
    this.setState({ ...initialState });
  }

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      ting_options: [{ text: value, value }, ...prevState.ting_options],
    }));
  };

  handleDChange = (e, { value }) => {
    this.setState({ ting_tag: value });
  };

  render() {
    return (
      <div className="create-ting">
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            required
            name="ting_name"
            label="tingName"
            value={this.state.ting_name}
            onChange={this.handleChange}
          />
          <TextField
            required
            name="ting_description"
            label="tingDescription"
            value={this.state.ting_description}
            onChange={this.handleChange}
          />
          <Select
            labelId="tingType"
            label="tingType"
            value={this.state.ting_type}
            name="ting_type"
            onChange={this.handleChange}
          >
            {TingType.map((node, index) => {
              return (
                <MenuItem key={index} value={Object.keys(node)[0]}>
                  {Object.keys(node)[0]}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            id="ting-amount"
            label="tingAmount"
            name="ting_amount"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.ting_amount}
            onChange={this.handleChange}
          />

          <Dropdown
            options={this.state.ting_options}
            placeholder="Choose Languages"
            search
            selection
            fluid
            multiple
            allowAdditions
            value={this.state.ting_tag}
            onAddItem={this.handleAddition as any}
            onChange={this.handleDChange as any}
          />

          <Button type="submit" variant="outlined" color="primary">
            Create ting
          </Button>
        </form>
      </div>
    );
  }
}
