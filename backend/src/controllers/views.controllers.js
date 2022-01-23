const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("home.ejs");
});

router.get("/article",(req,res)=>{
    res.render("article.ejs");
});
// router.get("/products",(req,res)=>{
//     res.render("product.ejs");
// });
// router.get("/knowledge",(req,res)=>{
//     res.render("knowledge.ejs");
// });
router.get("/track",(req,res)=>{
    res.render("trackorder.ejs");
});
router.get("/concerns",(req,res)=>{
    res.render("concerns.ejs");
});
// router.get("/login",(req,res)=>{
//     res.render("login.ejs");
// });
// router.get("/cart",(req,res)=>{
//     res.render("cart.ejs");
// });
router.get("/verification",(req,res)=>{
    res.render("verification.ejs");
});
router.get("/checkout",(req,res)=>{
    res.render("checkout.ejs");
});
router.get("/payment",(req,res)=>{
    res.render("payment.ejs");
});
// router.get("/signup",(req,res)=>{
//     res.render("signup.ejs");
// });
// router.get("/singlepage",(req,res)=>{
//     res.render("singleproduct.ejs");
// });
// router.get("/viewmore",(req,res)=>{
//     res.render("viewmore.ejs");
// });
module.exports = router;
