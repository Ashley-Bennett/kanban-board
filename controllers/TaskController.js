const Task = require("../models/Task");
const Board = require("../models/Board");

exports.listAllTasks = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

exports.createNewTask = (req, res) => {
  let newTask = new Task(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(task);
  });
};

exports.readTask = (req, res) => {
  Task.findById(req.params.taskid, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskid },
    req.body,
    { new: true },
    (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    }
  );
};

exports.deleteTask = (req, res) => {
  Task.remove({ _id: req.params.taskid }, (err, task) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Task successfully deleted" });
  });
};

////

exports.createNewBoard = (req, res) => {
  let newBoard = new Board(req.body);
  console.log(req.body);
  newBoard.save((err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(board);
    console.log(board);
  });
};

exports.readBoard = (req, res) => {
  // console.log(req.params.boardid);
  Board.findById(req.params.boardid, (err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(board);
    // console.log(board);
  });
};


exports.updateBoard = (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.params.boardid },
    req.body,
    { new: true },
    (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task)
      console.log("Board Updated");
    }
  );
}