import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TodoList from "./TodoList";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function TodoForm() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [dataCategory, setDatacategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/category").then((response) => {
      setDatacategory(response.data);
      console.log(response.data);
    });
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      category: category,
      priority: priority,
    };
    console.log(title);
    console.log(category);
    console.log(priority);
    axios.post("http://localhost:3001/todos", data).then((response) => {
      console.log(response);
    });
    window.setTimeout( function() {
      window.location.reload();
    }, 1000);
  };


  return (
    <div>
      <h2>Add ToDo</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Title"
          size="small"
          onChange={handleTitleChange}
          value={title}
        />
        <TextField
          required
          id="outlined-required"
          label="Priority"
          size="small"
          onChange={handlePriorityChange}
          value={priority}
        />
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          size="large"
        >
          Category
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {dataCategory.map((x, index) => (
            <MenuItem key={index} onClick={(e)=>setCategory(x._id)}>
              {x.title}
            </MenuItem>
          ))}
        </StyledMenu>
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Add
        </Button>
      </form>
      <TodoList/>
    </div>
  );
}
