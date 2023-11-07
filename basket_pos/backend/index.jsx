const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


app.use(session({
    key: "userID",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));


const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"basket1_pos",
});


app.listen(3001,()=>{
    console.log("Running server on 3001");
});

app.get('/profile',(req,res)=>{
    if (req.session.user){
        res.send({user: req.session.user});
    }else{
        res.status(401).json({ message: 'Not authenticated' });
    }

});

app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

app.post("/login" ,(req,res)=>{
    const employee_eMail = req.body.employee_eMail;
    const employee_password = req.body.employee_password;

    db.query(
        "SELECT * FROM employees WHERE employee_eMail = ? AND employee_password = ?",
        [employee_eMail,employee_password],
        (err,result)=>{
            if(err){
                 res.send({err:err})
            }

            if(result.length > 0){
                req.session.user = result;
                //console.log(req.session.user);
               return res.json(result);
            }else{
                res.send({message:"Wrong user/password"});
        }
    })
});

app.get("/services", (req, res) => {
    db.query("SELECT * FROM services", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No services found" });
            }
        }
    });
});

