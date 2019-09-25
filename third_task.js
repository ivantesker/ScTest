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

function send_json(data){
    data.forEach(function(row){
        let sentence = `INSERT INTO reqres (email, first_name, last_name, avatar) VALUES ('${row.email}', '${row.first_name}', '${row.last_name}', '${row.avatar}');`
        con.query(sentence, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
    });
}

pages_array.forEach(function(page) {
    fetch(`https://reqres.in/api/users?page=${page}`)
    .then(res => res.json())
    .then(json => send_json(json.data));
  });
