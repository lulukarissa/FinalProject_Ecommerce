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

router.post('/cart', (req, res) => {
    var data = {
        username: req.body.username,
        id_product: req.body.id_product,
        quantity: req.body.quantity,
        total_price: req.body.total_price
    }

    var dbstat = `SELECT * FROM cart where id_product = ? and username = ?`;
    db.query(dbstat, [data.id_product, data.username], (error, result) => {
        if (result.length > 0) {
            let dbstat = `UPDATE cart SET ? where id_product = ? and username = ?`;
            db.query(dbstat, [data, data.id_product, data.username], (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result);
                    res.send('Added to cart!');
                }
            })
        }
        else {
            let dbstat = 'insert into cart set ?';
            db.query(dbstat, data, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result);
                    res.send('Added to cart!');
                }
            })
        }
    })
})

router.get("/cart/:username", (req, res) => {
    let sql =
    `SELECT users.id, users.username,
    products.product_name, products.artist, products.image, products.price,
    cart.quantity, cart.total_price
    FROM cart
    JOIN users ON cart.username = users.username
    JOIN products ON cart.id_product = products.id_product
    WHERE cart.username = ?`;
    db.query(sql, req.params.username, (err, result) => {
        res.send(result);
    })
});


module.exports = router