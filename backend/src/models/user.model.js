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
        totalPrice: Number
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

userSchema.methods.addToCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        const cart = this.cart;
        const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            cart.items[isExisting].qty += 1;
        } else {
            cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!cart.totalPrice) {
            cart.totalPrice = 0;
        }
        cart.totalPrice += product.price;
        return this.save();
    }

};

userSchema.methods.removeFromCart = function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

module.exports = mongoose.model('User', userSchema);