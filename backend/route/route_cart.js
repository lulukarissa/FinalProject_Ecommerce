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
    var username = req.body.username
    var id_product = req.body.id_product

    var dbstat = `SELECT * FROM cart where id_product = ? and username = ?`;
    db.query(dbstat, [id_product, username], (error, result) => {
        if (result.length > 0) {
            var quantityupdate = result[0].quantity + parseInt(req.body.quantity)

            var dataupdate = {
                username: username,
                id_product: id_product,
                quantity: quantityupdate,
                total_price: req.body.total_price
            }
            let dbstat = `UPDATE cart SET ? where id_product = ? and username = ?`;
            db.query(dbstat, [dataupdate, id_product, username], (err, result) => {
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
            var datapost = {
                username: username,
                id_product: id_product,
                quantity: req.body.quantity,
                total_price: req.body.total_price
            }
            let dbstat = 'insert into cart set ?';
            db.query(dbstat, datapost, (err, result) => {
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
    var dbstat =
    `SELECT cart.id_cart, users.id, users.username,
    products.product_name, products.artist, products.image, products.price,
    cart.quantity, cart.total_price
    FROM cart
    JOIN users ON cart.username = users.username
    JOIN products ON cart.id_product = products.id_product
    WHERE cart.username = ?`;
    db.query(dbstat, req.params.username, (err, result) => {
        res.send(result);
    })
});

router.delete('/cartdelete/:id', (req, res)=>{
    var dbstat = 'delete from cart where id_cart = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send({
                status: `data ${req.params.id} has been deleted!`
        })
        }
    })
})


module.exports = router