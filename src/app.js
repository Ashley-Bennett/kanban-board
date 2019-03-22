const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const taskController = require("../controllers/TaskController");

// db instance connection
require("../config/db");

const app = express();
const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))
const port = process.env.PORT || 3301;

app.use(bodyParser.urlencoded({
    extended: true
}));
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

app
    
    .get("/board", (req, res) => {
        if (req.query.title === "Hello") {
            (taskController.createNewBoard)
            // console.log("hi")
        } else {
            // console.log("hello")
        }
    })
    .post("/board", (req, res) => {
        
            taskController.createNewBoard(req, res)
            

    })
    
    

app
    .route("/board/:boardid")
    .get(taskController.readBoard);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});