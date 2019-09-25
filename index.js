const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 8080;

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7306298",
  password: "wJVNMgSBM7",
  database: "sql7306298"
});

con.connect(function(err) {
  if (err) throw err;    
});

app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));

app.get('/reqres', function(req, res) {
    con.query('SELECT * FROM reqres', function(error, rows, fields) {
    //how do i get the values of url here
    res.send(rows);
  });
 });
app.get('/affluent', function(req, res) {
  con.query('SELECT * FROM affluent', function(error, rows, fields) {
    //how do i get the values of url here
    res.send(rows);
  });
 });
app.listen(port, () => console.log(`listening on port ${port}`))

function get_sql_data(table){
  let sentence = `select * from ${table};`
  con.query(sentence, function (err, result) {
      if (err) throw err;
      console.log(result);
      result = table;
      return result;
    });
}