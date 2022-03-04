const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/category");

router.post("/", (req, res, next) => {
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
    });
    category
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Post request to /category",
          createdCategory: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  router.get("/", (req, res, next) => {
    Category.find()
      .then((docs) => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  module.exports = router;