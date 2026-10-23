const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "member", "accountant", "admin"],
    default: "user",
  },
});

const UserModel = model("user", userSchema, "user");
module.exports = UserModel;
