import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import EditTodo from "./EditTodo";

export default function TodoList() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const onClickEdit = (value) => {
    let id = value;
    window.open(`/editTodo/${id}`, '_blank')
  };
  const onClickDelete = (value) => {
    let id = value;
    axios.delete(`http://localhost:3001/todos/${id}`).then((response) => {
      console.log(response);
    });
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };
  const onClickDone = (value) => {
    let id = value;
    //console.log(value);
    let data = [
      {
        propName: "isActive",
        value: true,
      },
    ];
    axios.patch(`http://localhost:3001/todos/${id}`, data).then((response) => {
      console.log(response);
    });
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  const loadPosts = async () => {
    const res = await axios.get(`http://localhost:3001/todos?page=${page}`);
    setData(res.data);
    console.log(data);
  };
  useEffect(() => {
    loadPosts();
  }, [page]);
  const handleChange = (e, value) => {
    setPage(value);
    console.log(page);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 1000 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableBody>
                {data.map((x) => (
                  <TableRow
                    key={x._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="x">
                      {x.id}
                    </TableCell>
                    <TableCell align="right">{x.title}</TableCell>
                    <TableCell align="right">{x.category}</TableCell>
                    <TableCell align="right">{x.priority}</TableCell>
                    <TableCell align="right">{x.dateCreated}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => onClickEdit(x._id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        disabled={x.isActive}
                        onClick={() => onClickDone(x._id)}
                      >
                        Done
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onClickDelete(x._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Pagination
        count={5}
        color="secondary"
        showFirstButton
        showLastButton
        defaultPage={page}
        onChange={handleChange}
      />
    </Grid>
  );
}
