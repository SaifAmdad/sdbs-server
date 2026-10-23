const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running fine",
  });
});

module.exports = app;
