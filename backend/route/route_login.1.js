var express = require('express');
var bodyParser   = require('body-parser');
var app = express();
var fs = require('fs');
var formidable = require('formidable');
var busboy = require('connect-busboy');
var cors = require('cors')
var router = express.Router();

app.use(cors());

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'getmyu_store'
});

connection.connect(()=>{
    console.log('You are now connected...')
})

/* POST users listing. */
router.post('/', function(req, res, next) {

  console.log(req.body.email);
      user_sql = 'INSERT INTO table_name VALUES (req.body.name, req.body.password)'

     console.log(user_sql)
  connection.query(user_sql, function (err, rows, fields) {
  if (err) throw err

console.log(rows)
res.end(JSON.stringify(rows));

   // res.json(rows);
});

   
       
 
});


module.exports = router;