var router = require('express').Router()
var db = require('../database_connection/db_connect');
var bodyParser = require('body-parser');
router.use(bodyParser.json())

var cors = require('cors')
router.use(cors())

//GET all data
router.get('/category', (req, res)=>{
    var dbstat = 'select * from category'
    db.query(dbstat, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})

//GET data by id_category
router.get('/categoryid/:id', (req, res)=>{
    var dbstat = 'select * from category where id_category = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})

//POST data
router.post('/category', (req, res)=>{
    var dbstat = 'insert into category set ?'
    var data = {
        // id_category: req.body.id_category,
        category_name: req.body.category_name
    }
    db.query(dbstat, data, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})

//UPDATE data by id
router.put('/category/:id', (req, res)=>{
    var dbstat = 'update category set ? where id_category = ?'
    var data = {
        category_name: req.body.category_name,
    }
    db.query(dbstat, [data, req.params.id], (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})

//DELETE data by id
router.delete('/category/:id', (req, res)=>{
    var dbstat = 'delete from category where id_category = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send({
            status: `data ${req.params.id} has been deleted!`
        })
    })
})

module.exports = router