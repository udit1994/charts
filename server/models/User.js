var bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function encrypt(password) {
  return bcrypt.hashSync(password, 8);
}

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, set: encrypt },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
