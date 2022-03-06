const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../models/todo");
const Category = require("../models/category");

router.post("/", (req, res, next) => {
    const category=Category.findById(req.body.category);
    if (!category)
        return res.status(400).json({
            message:"Invalid Category"
        });
    let todo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      category: req.body.category,
      priority: req.body.priority,
      isActive: req.body.isActive
    });
    todo
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Post request to /todos",
          createdTodo: result,
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
      const page = parseInt(req.query.page) || 0;
      const limit=parseInt(req.query.limit) || 5;
      let query={}
      Todo.find(query)
      .sort({dateCreated:-1})
      .skip(page*limit)
      .limit(limit)
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

  router.get("/:todoId", (req, res, next) => {
    const id = req.params.todoId;
    Todo.findById(id)
      .then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  router.patch("/:todoId", (req, res, next) => {
    const id = req.params.todoId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Todo.updateOne({ _id: id }, { $set: updateOps })
      .then((res) => {
        console.log(res);
        res.status(200).json(res);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  router.delete("/:todoId", (req, res, next) => {
    const id = req.params.todoId;
    Todo.remove({ _id: id })
      .then((res) => {
        console.log(res);
        res.status(200).json(res);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });


  module.exports = router;