const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/usermodel");

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    var obj={value:"right"};
    return res.render("signup",{obj,users});
  } 
  catch(err){
    return res.status(500).send(err.message);
  }
});
router.post("",
body("first_name").isLength({min:2}).withMessage("First name should be provided"),
body("last_name").isLength({min:1}).withMessage("Last name should be provided"),
body("email").isEmail().withMessage("Proper Email is required"),
body("password").isLength({min:3}).withMessage("Enter a strong password"),
  async (req, res) => {
    try {
      const error=validationResult(req);
      if(!error.isEmpty()){
          return res.status(400).json({data:error.array});          
      }

        let user = await User.findOne({ email: req.body.email }).lean().exec();
        
        var obj={value:"right"};
        if (user){
          obj={value:"wrong"};
          return res.render("signup",{obj,user});
        }
        user = await User.create(req.body);  
        
        return res.status(201).redirect("/login");
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }}
);

module.exports = router;
