const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
//const proxy = require('express-proxy')
const nodemailer = require('nodemailer')
const session = require('express-session');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10

const app = express()

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "2faappproject@gmail.com",
        pass: "caexgokvnagdaurj"
    }
})
let content = "";

app.use(session({
    key: "userid",
    secret: "a very secretive secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: false
    },
}
))
app.use(express.json());
app.use(cors({
    origin: ("http://localhost:3000"),
    methods: ("GET", "POST", "PUT"),
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded( {extended:true }));


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

app.get("/home", (req, res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

app.get("/logout", (req, res)=>{
    req.session.destroy();
    res.send({message:"Logout successful"})
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
                        if(err){
                            console.log(err)
                        }
                        if(response){
                            req.session.user = result
                            req.session.email = result[0].email
                            res.send(result)
                        }else{
                            res.send({message:"Wrong password"});
                        }
                    })
                 }else{
                    res.send({message:"Invalid Username"});
                 }
            }
        }
    );
})

app.get("/users/:username", (req,res)=>{
    const username = req.params.username;
     db.query(
         "SELECT * FROM users WHERE username = ?",
        username,
        (err, result) => {
            if(err){
                res.send({error: err});
            }else{
                if(result.length > 0){
                    res.send(result)
                 }else{
                    res.send({message:"Your username is not found"});
                 }
            }
        }
    );
})

app.put("/on2FA/:username", (req,res)=>{
    const username = req.params.username;
     db.query(
         "UPDATE users SET use2FA = 1 WHERE username = ?",
        username,
        (err, result) => {
            if(err){
                res.send({error: err});
            }else{
                if(result.length > 0){
                    res.send(result)
                 }else{
                    res.send({message:"Your username is not found"});
                 }
            }
        }
    );
})

app.put("/off2FA/:username", (req,res)=>{
    const username = req.params.username;
     db.query(
         "UPDATE users SET use2FA = 0 WHERE username = ?",
        username,
        (err, result) => {
            if(err){
                res.send({error: err});
            }else{
                if(result.length > 0){
                    res.send(result)
                 }else{
                    res.send({message:"Your username is not found"});
                 }
            }
        }
    );
})

app.get("/otp", (req, res) =>{
    const receiver = req.session.email
    content = {
        from: "2faappproject@gmail.com",
        to: receiver,
        subject: "OTP Code",
        text: "Your OTP Code is: 1234, please enter it to verify that you signed it to your account"
    }
    mailTransporter.sendMail(content, (err) =>{
        if(err){
            console.log(err);
        }else{
            res.send("otp email sent!");
        }
    })
})

app.listen(5000, () => {console.log("Listening on Port 5000")})