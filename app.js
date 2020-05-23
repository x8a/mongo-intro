const express = require("express");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");

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

app.get("/", (req, res, next) => res.render("index"))

app.post("/create-student", (req, res, next) => {
    // Create the model
    const Student = mongoose.model("Student", { name: String, surname: String, age: Number });
    const myStudent = new Student({name: req.body.name, surname: req.body.surname, age: req.body.age})
    
    // Save the students in mongo
    myStudent.save()
    .then(() => console.log(`Student stored successfully: ${myStudent}`))
    .catch(err => console.log(`Error when creating a student: ${err}`))
    
    console.log(req.body)
    res.render("index");
})

app.listen(3000, () => console.log("Server running on port 3000"))