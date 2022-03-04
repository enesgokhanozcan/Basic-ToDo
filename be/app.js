const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const connection=

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(connection,{
  useNewUrlParser:true,
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT",
        "POST",
        "DELETE",
        "GET",
        "PATCH"
      );
      return res.status(200).json({});
    }
    next();
  });
  

const todoRoutes = require("./api/routes/todos");
const categoryRoutes = require("./api/routes/category");

app.use('/todos',todoRoutes);
app.use('/category',categoryRoutes);

module.exports = app;