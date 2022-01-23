const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

router.post("/addtocart",async(req,res)=>{
    const product = await Product.findById(req.body.id).lean().exec();
    const findcart = await Cart.find({product_id: req.body.id}).lean().exec();
    console.log(findcart);
    let cart;
    if (findcart.length > 0){
        cart = await Cart.findOneAndUpdate({product_id: req.body.id},{
            product_qty: findcart[0].product_qty+1,
            total_price: findcart[0].total_price+product.dprice,
        });
    }else {
        cart = await Cart.create({
            product_id: req.body.id,
            product_qty: product.quantity,
            total_price: product.dprice
        })
    }
    return res.redirect(`/products/${req.body.id}`);
})

router.get("/",async(req,res)=>{
    try{
        const cart = await Cart.find().populate({path: "product_id"}).lean().exec();
        return res.render("cart.ejs",{usercart: cart});
        // return res.status(201).send({usercart: cart});
    }catch(err){
        return res.end({message: err.message});
    }
});

router.delete("/delete/:id",async(req,res)=>{
    try{
        const cart = await Cart.findByIdAndDelete(req.body.id);
        const scart = await Cart.find().populate({path: "product_id"}).lean().exec();
        console.log(scart);
        return res.redirect("cart.ejs",{usercart: cart});
        // return res.status(201).send({usercart: cart});
    }catch(err){
        return res.end({message: err.message});
    }
})
module.exports = router;