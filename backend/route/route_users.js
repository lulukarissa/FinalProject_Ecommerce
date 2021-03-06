var router = require('express').Router()
var db = require('../database_connection/db_connect');
var bodyParser = require('body-parser');
router.use(bodyParser.json())

var cors = require('cors')
router.use(cors())

//GET all data
router.get('/users', (req, res)=>{
    var dbstat = 'select * from users order by id desc'
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
router.put('/users/:username', (req, res)=>{
    var dbstat = 'update users set ? where username = ?'
    var data = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        telephone: req.body.telephone,
        address: req.body.address
    }
    db.query(dbstat, [data, req.params.username], (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
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