const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  image: {
    type: String,
  },
  phone: {
    type: Number,
  },
  status: {
    type: String,
    default: "active",
  },
  role: {
    type: String,
    enum: ["user", "member", "accountant", "admin"],
    default: "user",
  },
});

const UserModel = model("user", userSchema, "user");
module.exports = UserModel;
