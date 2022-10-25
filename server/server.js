const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const session = require('express-session');
const e = require('express');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10



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

app.post("/register", async (req,res) =>{
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if (err){
                console.log(err)
            }
            db.query(
                "INSERT INTO users (firstname, lastname, email, username, password) VALUES (?,?,?,?,?)",
                [firstname, lastname, email, username, hash],
                (err, result) =>{
                    if(err != null){
                        console.log(err);
                        res.send({message:"Registration Error"});
                    }else{
                        res.send("Post successful")
                    }
                }
            );
        })

})

app.post("/users", (req,res)=>{
    const username = req.body.username;
    const pass = req.body.password
     db.query(
         "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if(err){

                res.send({error: err});
            }else{
                if(result.length > 0){
                    bcrypt.compare(pass, result[0].password, (err, response)=>{
                        if(response){
                            res.send(result)
                        }else{
                            res.send({message:"Wrong password!"});
                        }
                    })
                 }else{
                    res.send({message:"User is not found!"});
                 }
            }
        }
    );
})

app.listen(5000, () => {console.log("Listening on Port 5000")})