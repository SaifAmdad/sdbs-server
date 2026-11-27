const express = require("express");
const {
  createTransaction,
  getTransactionByUserId,
  getAllTransactions,
} = require("../controller/transactionController");
const { isLogin, isAdmin, isAccountant } = require("../middleware/auth");
const transactionRouter = express.Router();

transactionRouter.post("/transaction", createTransaction);
transactionRouter.get("/all-transactions", getAllTransactions);
transactionRouter.get("/transactions/:id", isLogin, getTransactionByUserId);
transactionRouter.patch("/transaction/:id", getTransactionByUserId);

module.exports = transactionRouter;
