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

//GET Province
router.get('/province', (request, response) => {
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/province?id=",
        "headers": {
            "key": "d1b5d9d73da1b8dc2c34f3bc5638af8f"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            // console.log(body.toString());
            response.send(body.toString())
        });
    });

    req.end();
})

//GET City
router.get('/city/:provid', (request, response) => {
    var http = require("https");
    var provid = request.params.provid

    var options = {
        "method": "GET",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": `/starter/city?id=&province=${provid}`,
        "headers": {
            "key": "d1b5d9d73da1b8dc2c34f3bc5638af8f"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            // console.log(body.toString());
            response.send(body.toString())
        });
    });

    req.end();
})

// //SHIPPING
// var qs = require("querystring");
// var http = require("https");

// var options = {
//   "method": "POST",
//   "hostname": "api.rajaongkir.com",
//   "port": null,
//   "path": "/starter/cost",
//   "headers": {
//     "key": "d1b5d9d73da1b8dc2c34f3bc5638af8f",
//     "content-type": "application/x-www-form-urlencoded"
//   }
// };

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.write(qs.stringify({ origin: '501',
//   destination: '114',
//   weight: 1700,
//   courier: 'jne' }));
// req.end();

module.exports = router