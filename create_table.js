var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7306298",
  password: "wJVNMgSBM7",
  database: "sql7306298"
});

con.connect(function(err) {
  if (err) throw err;    
});

var sql = "CREATE TABLE affluent (date VARCHAR(255), commision VARCHAR(255), sales VARCHAR(255), leads VARCHAR(255), clicks VARCHAR(255), epc VARCHAR(255), impressions VARCHAR(255), cr VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
