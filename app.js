const express = require("express");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const Student = require("./models/Student"); // Import the Student model we created

const app = express();

app.use(express.json());
//app.use(express.raw()); // We do not need this now
app.use(express.urlencoded({extended: true}));


app.set("view engine", "hbs");
//app.set("views", path.join(__dirname, "views")); // We do not really need this line

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost/myStudentsDB", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`Connected to Mongo! Database name: ${db.connection.name}.`)) // OR db.connections[0].name
  .catch((err) => console.error(`Error when conencting to mongo: ${err}`));

// Event listener --> is mongoose connected?
//mongoose.connection.on("connected", () => console.log("Mongoose default connection is connected!"));
//mongoose.connection.on("disconnected", () => console.log("Mongoose default connection is disconnected!")); // only when the db is down

// Node event listener
//process.on("SIGINT", () => console.log("Node disconnecting!"));

app.get("/", (req, res, next) => res.render("index"))

app.post("/create-student", (req, res, next) => {
    
    const data = {name: req.body.name, surname: req.body.surname, age: req.body.age};

    Student.create(data)
    .then(() => console.log(`Student stored successfully: ${data}`))
    .catch(err => console.log(`Error when creating a student: ${err}`))
    
    console.log(req.body)
    res.render("index");
})

app.get("/list", (req, res, next) => {
    Student.find()
    .then(student => res.render("list", {student}))
    .catch((err) => console.error(`Error when finding students: ${err}`));
})

app.listen(3000, () => console.log("Server running on port 3000"))