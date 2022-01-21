const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  { 
    first_name:{ type: String, required: true}, 
    last_name:{ type: String, required: true}, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // roles: [{ type: String, required: false , default:"user" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
