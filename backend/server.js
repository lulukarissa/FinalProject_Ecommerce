var express = require('express');
var route_users = require('./route/route_users')
var route_login = require('./route/route_login')
var route_loginadmin = require('./route/route_loginadmin')
var route_products = require('./route/route_products')
var route_cart = require('./route/route_cart')
var route_category = require('./route/route_category')
var route_shipping = require('./route/route_shipping')
var cors = require('cors')

var server = express();
server.use(route_products);
server.use(route_cart);
server.use(route_category);
server.use(route_shipping);
server.use(route_users);
server.use(route_login);
server.use(route_loginadmin);
server.use(cors())
server.use('/img', express.static('storage'))

// route
server.get('/', (req, res)=>{
    res.send('<h1>Express MySQL</h1>')
})

// aktivasi server
server.listen(3210, ()=>{
    console.log('Server has been actived in port 3210')
})