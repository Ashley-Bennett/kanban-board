const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const taskController = require("../controllers/TaskController");

// db instance connection
require("../config/db");

const app = express();
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
const port = process.env.PORT || 3301;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// API ENDPOINTS

app
  .route("/tasks")
  .get(taskController.listAllTasks)
  .post(taskController.createNewTask);

app
  .route("/tasks/:taskid")
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

app.post("/board", (req, res) => {
  taskController.createNewBoard(req, res);
});

app.get("/board/:boardid", (req, res) => {
  taskController.readBoard(req, res);
  // console.log(res)
  // return res.send({object: res})
});

app.put("/board/:boardid", (req, res) => {
  taskController.updateBoard(req, res)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
