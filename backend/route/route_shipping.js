var router = require('express').Router()
var bodyParser = require('body-parser');
var cors = require('cors')


router.use(bodyParser.json());
router.use(cors());


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

router.post('/shipping', (request, response) => {
    var qs = require("querystring");
    var http = require("https");

    var options = {
        "method": "POST",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/cost",
        "headers": {
            "key": "d1b5d9d73da1b8dc2c34f3bc5638af8f",
            "content-type": "application/x-www-form-urlencoded",
            "Content-Length": 50
        }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        response.send(body.toString());
    });
    });

    req.write(qs.stringify({ origin: '153',
    destination: request.body.destination,
    weight: request.body.quantity * 600,
    courier: 'jne' }));
    req.end();
})


module.exports = router