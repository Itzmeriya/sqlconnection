const mysql = require("mysql2");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});
app.listen(3000, () => console.log("express server is running"));

app.get("/student", (req, res) => {
  mysqlConnection.query(
    "select * from student;",(err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
app.get("/student/:id", (req, res) => {
    mysqlConnection.query(
      "select * from student WHERE student_id = ?",[req.params.id],(err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
  app.delete("/student/:id", (req, res) => {
    mysqlConnection.query(
      "delete from student WHERE student_id = ?",[req.params.id],(err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
app.post('/student/add', (req,res)=>{
    mysqlConnection.query(
        "insert into student (firstname, lastname) values('Abhi','S');",(err,rows,fields)=>{
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
});

app.get("/course", (req, res) => {
    mysqlConnection.query(
      "select * from course;",(err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
  app.post('/course/add', (req,res)=>{
    mysqlConnection.query(
        "insert into course (course_name,student_id) values('Sanskrit',4);",(err,rows,fields)=>{
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
});
   app.get("/exams", (req, res) => {
    mysqlConnection.query(
      "select * from exams;",(err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
  app.post('/exams/add', (req,res)=>{
    mysqlConnection.query(
        "insert into exams (exam_name,student_id) values('Sanskrit',4);",(err,rows,fields)=>{
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
});
  app.get("/sc", (req, res) => {
    mysqlConnection.query(
      "select student.student_id,student.firstname,student.lastname,course.course_id,course.course_name from student join course on student.student_id=course.student_id ;",(err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
  app.get("/sce", (req, res) => {
    mysqlConnection.query(
      "select student.student_id,student.firstname,student.lastname,exams.exam_name,course.course_name from student join exams join course on student.student_id=exams.student_id=course.student_id;",(err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
  