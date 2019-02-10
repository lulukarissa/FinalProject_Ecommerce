var express = require('express')
var app = express()

var router = require('express').Router()
var mysql = require('mysql')
var upload = require('express-fileupload')
var bodyParser = require('body-parser');
var cors = require('cors')

//middleware
app.use(upload())
app.use(cors())
// app.use('/img', express.static('storage'))

router.use(bodyParser.json())
router.use(upload())
router.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'getmyu_store',
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
})

//===============================================ALLPRODUCTS=====================================================

//GET all data
router.get('/product', (req, res)=>{
    var dbstat = 'select * from products'
    db.query(dbstat, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

//GET data by id
router.get('/product/:id', (req, res)=>{
    var dbstat = 'select * from products where id_product = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

//UPDATE data by id
router.put('/product/:id', (req, res)=>{
    
    var image = req.files.image.name
    var data = {
        product_name: req.body.product_name,
        artist: req.body.artist,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        image: image
    }
    if(req.files){
        var storage = req.files.image
        storage.mv('./storage/' + image, (err) => {
            if (err) {
                console.log('Upload gagal!');
            }
            else {
                console.log('Upload berhasil!');
                var dbstat = 'update products set ? where id_product = ?'
                db.query(dbstat, [data, req.params.id], (error, result)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log(result)
                        res.send(result)
                    }
                })
            }
        })
    }
})

//DELETE data by id
router.delete('/product/:id', (req, res)=>{
    var dbstat = 'delete from products where id_product = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send({
                status: `data ke-${req.params.id} terhapus!`
            })
        }
    })
})

//===============================================ARTIST=====================================================

//GET data by artist
router.get('/artist/:artist', (req, res)=>{
    var dbstat = 'select * from products where artist = ?'
    db.query(dbstat, req.params.artist, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

//GET products total by artist
router.get('/artistproducts/', (req, res)=>{
    var dbstat = 'select artist, count(product_name) as artistcount from products group by artist'
    db.query(dbstat, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

//===============================================CATEGORY=====================================================

//GET category
router.get('/category', (req, res)=>{
    var dbstat = 'select * from category'
    db.query(dbstat, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})


//GET products by category
router.get('/category/:id', (req, res)=>{
    var dbstat = 'select * from products where category = ?'
    db.query(dbstat, req.params.id, (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

//POST data
router.post('/product', (req, res)=>{
    
    var image = req.files.image.name
    var data = {
        product_name: req.body.product_name,
        artist: req.body.artist,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        image: image
    }
    if(data !== '' && image !== ''){
        var storage = req.files.image
        storage.mv('./storage/' + image, (err) => {
            if (err) {
                console.log('Upload gagal!');
            }
            else {
                console.log('Upload berhasil!');
                var dbstat = 'insert into products set ?'
                db.query(dbstat, data, (error, result)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log(result)
                        res.send(result)
                    }
                })
            }
        })
    }
})


module.exports = router