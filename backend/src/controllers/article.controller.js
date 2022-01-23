const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodel');
router.get("/",async(req,res)=>{
    try{
        const blog = await Blog.find().lean().exec();
        return res.render("viewmore.ejs",{blogs:blog});
    }catch(err){
        return res.status(500).send({message: err.message});
    }
});
router.get("/:id",async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).lean().exec();
        return res.render("article.ejs",{blogs:blog});
    }catch(err){
        return res.status(500).send({message: err.message});
    }
});
module.exports = router;