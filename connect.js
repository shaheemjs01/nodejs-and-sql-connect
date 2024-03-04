var express = require("express");
var app = express();
var mysql = require("mysql");

// Middleware to parse JSON bodies
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registration",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

// get students information
app.get("/student", function (req, res) {
  con.query("SELECT * FROM student1", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// get a student information by ID
app.get("/student/:student_id", function (req, res) {
  let student_id = req.params.student_id;

  con.query(
    "SELECT * FROM student1 WHERE student_id = ?",
    [student_id],
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// add new student
app.post("/student", function (req, res) {
  const { student_id, student_name, age, place } = req.body;

  con.query(
    "INSERT INTO student1 (student_id, student_name, age, place) VALUES (?, ?, ?, ?)",
    [student_id, student_name, age, place],
    function (err, result) {
      if (err) throw err; // Throw error if insertion fails
      res.send(result); // Send result back as response
    }
  );
});

// update a student (To be implemented)
app.put("/student", function (req, res) {
  let { student_id, student_name, age, place } = req.body;
  con.query(
    "UPDATE student1 SET student_name = ?, age = ?, place =? WHERE student_id = ?",
    [student_name, age, place, student_id],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// delete a student (To be implemented)
app.delete("/student/:student_id", function (req, res) {
  let student_id = req.params.student_id;

  con.query(
    "DELETE FROM student1 WHERE student_id = ?",
    [student_id],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/", function (req, res) {
  res.send("<h1>Hello, this is my page</h1>");
});

app.listen(8005, function () {
  console.log("Server connected");
});
