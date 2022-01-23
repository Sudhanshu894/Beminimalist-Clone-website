const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get("/", async (req, res) => {
    try {
        let products;
        let search = req.query.category;

        if(!search){
            products=await Product.find().lean().exec();
        }else{
            products = await Product.find({category:search}).lean().exec();
        }
        return res.status(201).render("product",{products: products});
    } catch (err) {
        return res.status(500).send(err.message)
    }
});
router.get("/:id", async (req, res) => {
    try {
        const products=await Product.findById(req.params.id).lean().exec();
            return res.status(201).render("singleproduct.ejs",{products: products});
    } catch (err) {
        return res.status(500).send(err.message)
    }
});

module.exports = router;