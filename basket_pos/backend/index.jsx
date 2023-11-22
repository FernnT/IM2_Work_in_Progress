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


app.get("/garments", (req, res) => {
    db.query("SELECT * FROM garments", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No garments found" });
            }
        }
    });
});

app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No customers found" });
            }
        }
    });
});

app.post("/addOrder",(req,res)=>{
    const newOrder = req.body.newOrder;
    const customer = req.body.customer;
    const employee = req.body.employee;
    const total = req.body.total;
    const order_pickUP= req.body.order_pickUP;
    const order_paidAmount = req.body.order_paidAmount;

    console.log(customer);
    
    // db.beginTransaction(err =>{
    //     if(err){
    //         console.log(err);
    //         return res.send({err:err});
           
    //     }   //add payment method later and remarks?
    // const insertOrderQuery= "INSERT INTO `orders`(`customer_ID`, `employee_ID`, `order_date`, `order_pickup`, `order_total`, `order_paidAmount`) VALUES (?, ?, ?, ?, ?, ?)";

    // db.query(insertOrderQuery,[customer.customer_ID,employee.employee_ID,Date(),order_pickUP,total,order_paidAmount],(err1,result1)=>{
    //     if(err1){
    //         return db.rollback(()=>{
    //             res.send({err:err1});
    //         });
    //     }

    //     const orderID = result1.insertId;

    //     const insertOrderDetailsQuery="INSERT INTO `orderdetails`(`order_ID`, `quantity`, `order_price`, `service_ID`) VALUES ?"
    //     //format for bulk insert
    //     const bulkOrderDetails = newOrder.map(orderDetails=>[orderID,orderDetails.qty,orderDetails.service_price,orderDetails.service_ID])

    //     db.query(insertOrderDetailsQuery,[bulkOrderDetails],(err2,result2)=>{
    //         if(err2){
    //             // Rollback the transaction if there's an error
    //             return db.rollback(()=>{
    //                 res.send({err:err2});
    //             });
    //         }

    //     const detailID = result2.insertId;
        
    //     const garmentsInOrder = "INSERT INTO `garmentsinorder`(`orderDetails_ID`, `garment_ID`,'qty') VALUES(?)"
        
    //     const bulkGarmentsOrder = newOrder.garmentsIn.map(garments=>[detailID,garments.garment_ID,garments.quantity])

    //     db.query(garmentsInOrder,[bulkGarmentsOrder],(err3,result3)=>{
    //         if(err3){
    //             // Rollback the transaction if there's an error
    //             return db.rollback(()=>{
    //                 res.send({err:err3});
    //             });
    //         }

//             db.commit(err1=>{
//                 if (err1) {
//                     // Rollback the transaction if there's an error
//                     return db.rollback(() => {
//                         res.send({ err: err4 });
//                     });
//                 }
//                  res.send({ message: "Data uploaded successfully" });
//             })
//     //     });
//     //     });
//      });
//     });
});

