var router = require('express').Router()
var bodyParser = require('body-parser');
var cors = require('cors')

var nodemailer = require('nodemailer')
var xoauth2 = require('xoauth2')


router.use(bodyParser.json());
router.use(cors());

var sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lulukarissa@gmail.com',
        type: 'OAuth2',
        clientId: '571929680089-0nulnrrljfsif56t1306op028v59v94c.apps.googleusercontent.com',
        clientSecret: 'lMaxG3gcjJeffEZSWwOJRM0z',
        refreshToken: '1/FHOgOX2mHYHcgJLofkkK4Voh9rXk2dzuEqimzggJ9WZFo8p2H-bC4zvdxlrrHt77'
    }
})


router.post('/mail', (req,res)=>{
    var myletter = {
        from: 'GET-Myu Store <info@getmyu.com>',
        to: req.body.email,
        subject: 'Order Confirmation',
        text: `Dear ${req.body.first_name} ${req.body.last_name}

        Thank you for shopping with us.
        Your order is currently awaiting payment via bank transfer.
        View Invoice: http://localhost:3000/invoice/${req.body.id_order}
        
        You have to fill the payment confirmation form in here:
        http://localhost:3000/payment_notif/${req.body.id_order}`
    }
    
    sender.sendMail(myletter, (x)=>{
        if(x){
            console.log(x)
            console.log('Failed!')
            res.send('Failed!')
        }
        else{
            console.log('Sent!')
            res.send('Sent!')
        }
    })
})

module.exports = router