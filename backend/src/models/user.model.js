const mongoose = require('mongoose');
const Product = require('../models/product.model');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {type: String, required:false},
    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: {type: Number, required: false}
    }
},{
  versionKey: false,
  timestamps: true,
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', userSchema);