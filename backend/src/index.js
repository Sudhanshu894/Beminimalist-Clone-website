const express = require('express');
const cors = require('cors');
const app = express();
const Razorpay = require("razorpay");
const passport = require('./configs/passport');
const productController = require('./controllers/product.controller');
const viewscontroller = require('./controllers/views.controllers');
const cartController = require('./controllers/cart.controller');
const signupcontroller = require("./controllers/signupcontroller");
const logincontroller=require("./controllers/logincontroller");
const blogController = require('./controllers/blogcontroller');
const articleController = require('./controllers/article.controller');
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}));

// app.use( bodyParser.urlencoded({extended : true }));
// app.use( bodyParser.json() 
app.set("view engine","ejs")
app.use(express.static("public"))
app.use("/",viewscontroller);
app.use("/knowledge",blogController);
app.use("/viewmore",articleController);
app.use("/products",productController);
app.use("/signup", signupcontroller);
app.use("/login",logincontroller);
app.use("/cart",cartController);

//-------passport---------
app.use(passport.initialize());

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {
    callback(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure"
  }),
  (req, res) => {
    return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", (req, res) => {
  return res.send("Failure");
});

let orderIdavar;

const razorpay = new Razorpay({
    key_id:process.env.keyId,
    key_secret:process.env.key_secret
})
app.use(express.urlencoded({extended:false}));

app.get("",async(req,res)=>{
    res.render(`payment.ejs`)
})
app.post("/order",(req,res) =>{
  let price = +req.query.totalprice
    let options = {
        amount: price*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      }

      razorpay.orders.create(options,function(err,order){
        orderIdavar = order.id
          res.json(order) //order sent
      })

})

app.post("/ordercompleted",(req,res)=>{
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        console.log(paymentDocument)
        if(paymentDocument.status == `captured`) return res.send(`payment successfull `)

        else return  res.send(`payment Failed`)
    })
})
module.exports = app;
