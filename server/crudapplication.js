var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post('/api/addUser', function(req, res) {
  var sql = "INSERT INTO nodejs.Users(name,age,address)VALUES('"+ req.body.name +"', '"+ req.body.age +"','"+req.body.address+"')";

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
