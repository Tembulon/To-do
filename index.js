import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let todayTasks = [];
let workTasks = [];

app.get("/", (req, res) => {
    res.render("./index.ejs", { tasks: todayTasks });
});

app.get("/work", (req, res) => {
    res.render("./work.ejs", { tasks: workTasks });
});

app.post("/todayAddTask", (req, res) => {
    const newTask = req.body.newTask;
    if (newTask) {
        todayTasks.push(newTask);
    }
    res.redirect("/");
});

app.post("/workAddTask", (req, res) => {
    const newTask = req.body.newTask;
    if (newTask) {
        workTasks.push(newTask);
    }
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});