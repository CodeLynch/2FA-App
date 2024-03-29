const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
//const proxy = require('express-proxy')
const nodemailer = require('nodemailer')
const session = require('express-session');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const { request } = require('express');
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
let expireAT = "";

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
    password: ''
,})

db.connect((err) =>{
    if(err){
        throw err;
    }
    db.query("CREATE DATABASE IF NOT EXISTS 2fa_app", function (err, result) {
      if (err){
        throw err;
      } 
      console.log("Database created");
      db.query("USE 2fa_app");
      db.query("CREATE TABLE IF NOT EXISTS `users` (`UserID` int(11) NOT NULL AUTO_INCREMENT,`firstname` varchar(50) NOT NULL,`lastname` varchar(50) NOT NULL,`email` varchar(50) NOT NULL,`username` varchar(20) NOT NULL,`password` varchar(100) NOT NULL,`use2FA` tinyint(1) NOT NULL DEFAULT 1,`strongPass` tinyint(1) NOT NULL DEFAULT 0 , PRIMARY KEY (`UserID`), UNIQUE KEY `email` (`email`), UNIQUE KEY `username` (`username`)) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4", function (err, result) {
        if (err){
          throw err;
        } 
        console.log("Table created");
      })
    });
    console.log("MySql Connected")
})

app.get("/home", (req, res)=>{
    if(req.session.verified){
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
        const strongPass = req.body.strongPass

        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if (err){
                console.log(err)
            }
            db.query(
                "INSERT INTO users (firstname, lastname, email, username, password, strongPass) VALUES (?,?,?,?,?,?)",
                [firstname, lastname, email, username, hash, strongPass],
                (err, result) =>{
                    if(err != null){
                        console.log(err);
                        res.send({message:err.sqlMessage});
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
                            if(result[0].use2FA === 0){
                                req.session.verified = true;
                            }
                            res.send(result)
                        }else{
                            res.send({message:"Invalid Username/Password"});
                        }
                    })
                 }else{
                    res.send({message:"Invalid Username/Password"});
                 }
            }
        }
    );
})

app.post("/emails", (req,res)=>{
    const email = req.body.email;
        db.query(
                "SELECT * FROM users WHERE email = ?;",
               email,
               (err, result) => {
                   if(err){
                       res.send({isSuccess: false, message: err});
                   }else{
                    if(result.length > 0){
                        req.session.email = result[0].email
                        res.send({isSuccess: true, message:"Email found"});
                    }else{
                        res.send({isSuccess: false, message: "Email not found"});
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
    const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    req.session.otp = otp
    content = {
        from: "2faappproject@gmail.com",
        to: receiver,
        subject: "OTP Code",
        text: "Your OTP Code is: " + otp + ", please enter it to verify that you signed it to your account."
    }
    mailTransporter.sendMail(content, (err) =>{
        if(err){
            console.log(err);
        }else{
            res.send({message:"Email Sent!"});
        }
    })
})

app.get("/otp/:email", (req, res) =>{
    const receiver = req.params.email;
    const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    req.session.otp = otp
    content = {
        from: "2faappproject@gmail.com",
        to: receiver,
        subject: "OTP Code",
        text: "Your OTP Code is: " + otp + ", please enter it to verify that you want to reset your password."
    }
    mailTransporter.sendMail(content, (err) =>{
        if(err){
            console.log(err);
        }else{
            res.send({message:"Email Sent!"});
        }
    })
})

app.post("/2FAOtp", (req,res)=>{
    const sentOTP = req.body.otp; 
    if(sentOTP === req.session.otp){
        req.session.verified = true;
        res.send({isSuccess: true});
    }else{
        res.send({isSuccess: false});
    }
})

app.post("/resetPassOtp", (req,res)=>{
    const sentOTP = req.body.otp; 
    if(sentOTP === req.session.otp){
        res.send({isSuccess: true});
    }else{
        res.send({isSuccess: false});
    }
})

app.post("/changePass", (req,res)=>{
    const email = req.body.email;
    const pass = req.body.newPass;
    const strongPass = req.body.strongPass
    const use2FA = req.body.use2FA
    bcrypt.hash(pass, saltRounds, (err, hash)=>{
        if (err){
            console.log(err)
        }
        db.query(
            "UPDATE users SET password = ?, strongPass = ?, use2FA = ? WHERE email = ?",
           [hash, strongPass, use2FA, email],
           (err, result) => { 
               if(err){
                   res.send({error: err});
               }else{
                res.send({isSuccess: true})
                }
           }
       );
    })

})

app.listen(5000, () => {console.log("Listening on Port 5000")})