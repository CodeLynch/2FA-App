const express = require('express')
const mysql = require('mysql')
const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '2fa_app'
})

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log("MySql Connected")
})
app.listen(5000, () => {console.log("Listening on Port 5000")})