const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: { type: mongoose.ObjectId, required: true, ref: "User" },
    digest: { type: String, unique: true, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", userSchema);
