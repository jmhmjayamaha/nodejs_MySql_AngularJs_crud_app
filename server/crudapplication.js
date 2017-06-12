var express = require('express');
var mysql = require('mysql');
var app = express();

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


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
