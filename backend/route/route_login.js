var router = require('express').Router()
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'getmyu_store',
})

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
router.use(cors());

db.connect(()=>{
    console.log('You are now connected...')
})

// router.get('/', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/login.html'));
// });

// router.post('/auth', (req, res)=>{
// 	var username = req.body.username;
// 	var password = req.body.password;
// 	var dbstat = 'SELECT * FROM users WHERE username = ? AND password = ?';
// 	if (username && password) {
// 		db.query(dbstat, [username, password], (error, result)=>{
// 			if (result.length > 0) {
// 				req.session.loggedin = true;
// 				req.session.username = username;
// 				res.redirect('/home');
// 			} else {
// 				res.send('Incorrect Username and/or Password!');
// 			}			
// 			res.end();
// 		});
// 	} else {
// 		res.send('Please enter Username and Password!');
// 		res.end();
// 	}
// });

// router.get('/home', (req,res)=>{
// 	if (req.session.loggedin) {
// 		res.send('Welcome back, ' + req.session.username + '!');
// 	} else {
// 		res.send('Please login to view this page!');
// 	}
// 	res.end();
// });

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


router.get('/verif', (req, res) => {
    var perintah = 'select * from users';
    db.query(perintah, (error, hasil) => {
            if (error) throw error;
            console.log(hasil);
            res.send(hasil);
        })
})

module.exports = router