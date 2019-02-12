var router = require('express').Router()
var mysql = require('mysql')
var bodyParser = require('body-parser');
router.use(bodyParser.json())

var cors = require('cors')
router.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'getmyu_store',
})

db.connect(()=>{
    // console.log('Connect to MySQL!')
})

//GET all data
router.get('/users', (req, res)=>{
    var dbstat = 'select * from users'
    db.query(dbstat, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})

//GET data by id
router.get('/users/:username', (req, res)=>{
    var dbstat = 'select * from users where username = ?'
    db.query(dbstat, req.params.username, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})

//UPDATE data by id
router.put('/users/:id', (req, res)=>{
    var dbstat = 'update users set ? where id = ?'
    var data = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    db.query(dbstat, [data, req.params.id], (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            status: `Data ${req.params.id} has been updated!`
        })
    })
})

//DELETE data by id
router.delete('/users/:id', (req, res)=>{
    var dbstat = 'delete from users where id = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send({
            status: `data ${req.params.id} has been deleted!`
        })
    })
})

module.exports = router