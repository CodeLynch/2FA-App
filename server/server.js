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
            if(err != null){
                console.log(err);
            }else{
                console.log("Post successful");
            }
        }
    );
})

app.post("/login", (req,res)=>{
    const username = req.body.username;
    const pass = req.body.password
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ? ",
        [username, pass],
        (err, result) => {
            if(err){
                res.send({error: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({ alertClass: "danger", message: "Invalid username/password!"});
                }
            }
        }
    );
})

app.listen(5000, () => {console.log("Listening on Port 5000")})