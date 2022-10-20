const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json());

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

app.post("/register", (req,res) =>{

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    db.query(
        "INSERT INTO users (firstname, lastname, email, username, password) VALUES (?,?,?,?,?)",
        [firstname, lastname, email, username, password],
        (err, result) =>{
            console.log(err);
        }
    );
})
app.listen(5000, () => {console.log("Listening on Port 5000")})