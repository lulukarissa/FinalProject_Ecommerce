var router = require('express').Router()
var db = require('../database_connection/db_connect');
var bodyParser = require('body-parser');
var cors = require('cors')

router.use(bodyParser.json());
router.use(cors());

router.post('/register', (req, res) => {
    var data = {
        // id: req.body.id,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    var perintah = 'insert into users set ?'
    db.query(perintah, data, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil) // untuk respon
    })
})


router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && password === result[i].password) {
                    console.log('Login suskes');
                    var userId = result[i].id;
                    res.send((userId).toString());
                } else if (i === result.length - 1) {
                    console.log('Login gagal');
                }
            }
        }
    })
})

module.exports = router