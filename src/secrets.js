const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const mongoDBUrl = process.env.MONGODB_URL;

module.exports = { port, mongoDBUrl };
