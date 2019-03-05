var router = require('express').Router()
var db = require('../database_connection/db_connect');
var bodyParser = require('body-parser');
var cors = require('cors')

router.use(bodyParser.json());
router.use(cors());

router.post('/loginadmin', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'select * from admin';
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


router.get('/verifadmin', (req, res) => {
    var perintah = 'select * from admin';
    db.query(perintah, (error, hasil) => {
            if (error) throw error;
            console.log(hasil);
            res.send(hasil);
        })
})

module.exports = router