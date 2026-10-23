const { default: mongoose } = require("mongoose");
const { mongoDBUrl } = require("../secrets");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl);
    console.log("DB connected successfully !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
