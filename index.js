var mysql = require('mysql');
const fetch = require('node-fetch');

let pages_array = [1,2];

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7306298",
  password: "wJVNMgSBM7",
  database: "sql7306298"
});

con.connect(function(err) {
  if (err) throw err;    
});

pages_array.forEach(function(page) {
    fetch(`https://reqres.in/api/users?page=${page}`)
    .then(res => res.json())
    .then(json => console.log(json.data));
  });
