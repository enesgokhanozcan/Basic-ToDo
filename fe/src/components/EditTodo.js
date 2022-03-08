import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditTodo() {
  const [newtitle, setTitle] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const params = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = [
        {
          "propName": "title",
          "value": newtitle,
        },
      ];
      axios.patch(`http://localhost:3001/todos/${params.id}`, data).then((response) => {
        console.log(response);
      });
  };
  return (
    <div>
      <h2>Edit ToDo</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Title"
          size="small"
          onChange={handleTitleChange}
          value={newtitle}
        />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Edit
        </Button>
      </form>
    </div>
  );
}
