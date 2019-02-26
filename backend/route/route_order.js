var router = require('express').Router()
var mysql = require('mysql');
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

//POST the order
router.post('/order', (req, res) => {
    var datapost = {
        id_order: req.body.id_order,
        username: req.body.username,
        subtotal: req.body.subtotal,
        shippingcost: req.body.shippingcost,
        totalamount: req.body.totalamount,
        fullname: req.body.fullname,
        address: req.body.address,
        telephone: req.body.telephone
    }
    let dbstat = 'insert into orders set ?';
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

//POST the order_items
router.post('/orderitems', (req, res) => {
    var datapost = {
        id_order: req.body.id_order,
        id_product: req.body.id_product,
        quantity: req.body.quantity,
        total_price: req.body.total_price
    }
    let dbstat = 'insert into order_items set ?';
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

//update payment status by order id
router.put('/orderpayment/:id', (req, res) => {
    var datapost = {
        payment: req.body.payment
    }
    let dbstat = 'update orders set ? where id_order = ?';
    db.query(dbstat, [datapost, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

//update shipment status by order id
router.put('/ordershipment/:id', (req, res) => {
    var datapost = {
        shipment: req.body.shipment
    }
    let dbstat = 'update orders set ? where id_order = ?';
    db.query(dbstat, [datapost, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

//update complete status by order id
router.put('/ordercomplete/:id', (req, res) => {
    var datapost = {
        status: req.body.status
    }
    let dbstat = 'update orders set ? where id_order = ?';
    db.query(dbstat, [datapost, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
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
    var id_order = req.body.id_order
    
    var dbstat = 'select * from confirmpayment where id_order = ?'
    db.query(dbstat, id_order, (err, result)=>{
        if(result.length > 0){
            var dataupdate = {
                transaction_date: req.body.transaction_date,
                sender_name: req.body.sender_name,
                amount: req.body.amount,
                payment_to: req.body.payment_to,
                id_order: id_order
            }
            let dbstat = 'update confirmpayment set ? where id_order = ?';
            db.query(dbstat, [dataupdate, id_order], (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result);
                    res.send(result);
                }
            })
        }
        else{
            var datapost = {
                transaction_date: req.body.transaction_date,
                sender_name: req.body.sender_name,
                amount: req.body.amount,
                payment_to: req.body.payment_to,
                id_order: id_order
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

//DELETE confirmpayment by id_order
router.delete('/confirmpayment/:id', (req, res) => {
    let dbstat = 'delete from confirmpayment where id_order = ?';
    db.query(dbstat, req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

//GET all orders
router.get('/orders', (req, res) => {
    let dbstat = `SELECT * FROM orders`;
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

//GET all order by username
router.get('/orders/:username', (req, res) => {
    let dbstat = `SELECT * FROM orders WHERE username = ?`;
    db.query(dbstat, [req.params.username], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

//GET order details by id_order
router.get('/ordersbyid/:id', (req, res) => {
    let dbstat = `SELECT * FROM orders WHERE id_order = ?`;
    db.query(dbstat, [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

//GET orderitems by id_order
router.get('/orderitems/:id', (req, res) => {
    let dbstat = `SELECT order_items.id_order, order_items.id_product, order_items.quantity, order_items.total_price,
    products.product_name, products.artist, products.image, products.price
    FROM order_items
    JOIN products ON order_items.id_product = products.id_product
    WHERE order_items.id_order = ?`;
    db.query(dbstat, [req.params.id], (err, result) => {
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