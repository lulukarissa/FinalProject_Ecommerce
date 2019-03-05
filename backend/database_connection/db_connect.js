const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'getmyu_store',
})

db.connect(()=>{
    console.log('You are now connected...')
})

module.exports = db;