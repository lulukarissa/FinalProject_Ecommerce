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

router.post('/wishlist', (req, res) => {
    var data = {
        username: req.body.username,
        id_product: req.body.id_product
    }
    var dbstat = `SELECT * FROM wishlist where id_product = ? and username = ?`;
    db.query(dbstat, [data.id_product, data.username], (error, result) => {
        if (result.length > 0) {
            let dbstat = `UPDATE wishlist SET ? where id_product = ? and username = ?`;
            db.query(dbstat, [data, data.id_product, data.username], (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result);
                    res.send('Added to wishlist!');
                }
            })
        }
        else {
            let dbstat = 'insert into wishlist set ?';
            db.query(dbstat, data, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result);
                    res.send('Added to wishlist!');
                }
            })
        }
    })
})

router.get("/wishlist/:username", (req, res) => {
    var dbstat =
    `SELECT wishlist.id_wishlist, users.id, users.username,
    products.id_product, products.product_name, products.artist, products.image, products.price, products.quantity
    FROM wishlist
    JOIN users ON wishlist.username = users.username
    JOIN products ON wishlist.id_product = products.id_product
    WHERE wishlist.username = ?`;
    db.query(dbstat, req.params.username, (err, result) => {
        res.send(result);
    })
});

router.delete('/wishlistdelete/:id', (req, res)=>{
    var dbstat = 'delete from wishlist where id_wishlist = ?'
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