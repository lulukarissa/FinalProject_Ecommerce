var router = require('express').Router()
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'getmyu_store',
})

router.use(bodyParser.json());
router.use(cors());

db.connect(()=>{
    console.log('You are now connected...')
})

//POST the order id
router.post('/order', (req, res) => {
    var datapost = {
        id_order: req.body.id_order,
        totalamount: req.body.totalamount
    }
    let dbstat = 'insert into orders set ?';
    db.query(dbstat, datapost, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send('Added to order!');
        }
    })
})

//count the payment order by id
router.get('/totalpayment/:id', (req,res)=>{
    var dbstat = 'select totalamount from orders where id_order = ?'
    db.query(dbstat, [req.params.id], (err, result) => {
        res.send(result);
    })
})

//POST payment confirmation
router.post('/confirmpayment', (req, res) => {
    var datapost = {
        transaction_date: req.body.transaction_date,
        sender_name: req.body.sender_name,
        amount: req.body.amount,
        payment_to: req.body.payment_to,
        id_order: req.body.id_order
    }
    let dbstat = 'insert into confirmpayment set ?';
    db.query(dbstat, datapost, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

//GET payment confirmation
router.get('/confirmpayment', (req, res) => {
    let dbstat = 'select * from confirmpayment';
    db.query(dbstat, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

module.exports = router