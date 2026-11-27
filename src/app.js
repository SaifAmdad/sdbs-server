const express = require("express");
const userRouter = require("./router/userRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const transactionRouter = require("./router/transactionRouter");
const app = express();

// Global -----------

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Routers ----------
app.use(userRouter);
app.use(transactionRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running fine",
  });
});

module.exports = app;
