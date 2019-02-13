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

//GET data filter by alphabetical asc
router.get('/alphabeticalasc', (req, res)=>{
    var dbstat = ' select * from products order by product_name asc'
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


//GET data filter by price alphabetical desc
router.get('/alphabeticaldesc', (req, res)=>{
    var dbstat = ' select * from products order by product_name desc'
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

//GET data filter by date oldest to newest
router.get('/dateoldest', (req, res)=>{
    var dbstat = ' select * from products order by id_product asc'
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

//GET data filter by date newest to oldest
router.get('/datenewest', (req, res)=>{
    var dbstat = 'select * from products order by id_product desc'
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

//GET data filter by price low to high
router.get('/pricelow', (req, res)=>{
    var dbstat = ' select * from products order by price asc'
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

//GET data filter by price high to low
router.get('/pricehigh', (req, res)=>{
    var dbstat = ' select * from products order by price desc'
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

//GET data filter by alphabetical asc
router.get('/artalphabeticalasc/:id', (req, res)=>{
    var dbstat = ' select * from products where artist = ? order by product_name asc'
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


//GET data filter by price alphabetical desc
router.get('/artalphabeticaldesc/:id', (req, res)=>{
    var dbstat = ' select * from products where artist = ? order by product_name desc'
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

//GET data filter by date oldest to newest
router.get('/artdateoldest/:id', (req, res)=>{
    var dbstat = ' select * from products where artist = ? order by id_product asc'
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

//GET data filter by date newest to oldest
router.get('/artdatenewest/:id', (req, res)=>{
    var dbstat = 'select * from products where artist = ? order by id_product desc'
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

//GET data filter by price low to high
router.get('/artpricelow/:id', (req, res)=>{
    var dbstat = ' select * from products where artist = ? order by price asc'
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

//GET data filter by price high to low
router.get('/artpricehigh/:id', (req, res)=>{
    var dbstat = ' select * from products where artist = ? order by price desc'
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

//GET data filter by alphabetical asc
router.get('/catalphabeticalasc/:id', (req, res)=>{
    var dbstat = ' select * from products where category = ? order by product_name asc'
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


//GET data filter by price alphabetical desc
router.get('/catalphabeticaldesc/:id', (req, res)=>{
    var dbstat = ' select * from products where category = ? order by product_name desc'
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

//GET data filter by date oldest to newest
router.get('/catdateoldest/:id', (req, res)=>{
    var dbstat = ' select * from products where category = ? order by id_product asc'
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

//GET data filter by date newest to oldest
router.get('/catdatenewest/:id', (req, res)=>{
    var dbstat = 'select * from products where category = ? order by id_product desc'
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

//GET data filter by price low to high
router.get('/catpricelow/:id', (req, res)=>{
    var dbstat = ' select * from products where category = ? order by price asc'
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

//GET data filter by price high to low
router.get('/catpricehigh/:id', (req, res)=>{
    var dbstat = ' select * from products where category = ? order by price desc'
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





module.exports = router