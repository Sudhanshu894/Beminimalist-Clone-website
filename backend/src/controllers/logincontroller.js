const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/user.model");
router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    var obj={value:"right"};
    return res.render("login",{obj,users});
  } 
  catch(err){
    return res.status(500).send(err.message);
  }
});
router.post("",
body("email").isEmail().withMessage("Proper Email is required"),
body("password").isLength({min:3}).withMessage("Enter a strong password"),
  async (req, res) => {
    try {
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({data:error.array});          
        }  
        let user = await User.findOne({ email: req.body.email });
        var obj={value:"right"};
    
        if (!user){
          obj={value:"wrong"};
          return res.render("login",{obj,user});
        }
        const match = user.checkPassword(req.body.password);
    
        if (!match){
          obj={value:"wrong"};
          return res.render("login",{obj,user});
        }
        console.log(user);
        return res.status(201).redirect("/");
      } 
      catch(err){
        return res.status(500).send({ message: err.message });
      }
  }
);

module.exports = router;
