var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs"
});

con.connect(function(err) {
  if (err) throw err;
});

app.get('/api', function (req, res) {
   res.writeHead(200, {"Content-Type": "application/json"});

   var status = JSON.stringify({
     "status" : "working"
   });

   res.end(status);
})

app.get('/api/listUsers', function (req, res) {
   res.writeHead(200, {"Content-Type": "application/json"});

   con.query("SELECT * FROM Users", function (err, result) {
     if (err) throw err;
     var data = JSON.stringify(result);
     res.end(data);
   });
});

app.get('/api/findUser', function (req, res) {
   res.writeHead(200, {"Content-Type": "application/json"});

   con.query("SELECT * FROM Users WHERE id = " + req.query.id, function (err, result) {
     if (err) throw err;
     var data = JSON.stringify(result);
     res.end(data);
   });
});

app.post('/api/addUser', function(req, res) {
  var sql = "INSERT INTO nodejs.Users(name,age,address)VALUES('"+ req.body.name +"', '"+ req.body.age +"','"+req.body.address+"')";

  con.query(sql, function (err, result) {
    if (err) throw err;
  });
  res.status(201).json({ status: 'SUCCESS' });
});

app.put('/api/updateUser', function(req, res) {
   var sql = "UPDATE nodejs.Users SET  name = '"+ req.body.name +"',age = '"+ req.body.age +"' ,address = '"+req.body.address+"' WHERE id = "+ req.body.id;

   con.query(sql, function (err, result) {
    if (err) throw err;
   });
   res.status(200).json({ status: 'SUCCESS' });
});

app.delete('/api/deleteUser', function(req, res) {
  var sql = "DELETE FROM nodejs.Users WHERE id = " + req.query.id;

  con.query(sql, function (err, result) {
   if (err) throw err;
  });
  res.status(200).json({ status: 'SUCCESS' });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
