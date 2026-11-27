const TransactionModel = require("../models/transactionModel");
const UserModel = require("../models/userModel");

const createTransaction = async (req, res) => {
  try {
    const info = req.body;
    let transactionInfo = {};

    const accountant = await UserModel.findById(info.accountantId);
    if (!accountant) {
      return res.status(404).send({
        message: "Accountant not found",
      });
    }

    const user = await UserModel.findById(info.memberId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    transactionInfo.accountantName = accountant.name;
    transactionInfo.memberName = user.name;

    if (
      info.amount < 1 ||
      info.month < 0 ||
      info.month > 11 ||
      info.year < 2026
    ) {
      return res.status(404).send({
        message: "Wrong input data",
      });
    }

    for (let key in info) {
      if (key === "accountantName" || key === "memberName") {
        continue;
      }
      transactionInfo[key] = info[key];
    }

    const transaction = await TransactionModel.create(transactionInfo);
    console.log(transaction);
    res.status(200).send({
      success: true,
      message: `Transaction has been successfull`,
      transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const info = req.body;
    res.status(200).send({
      success: true,
      message: `Transaction has been updated successfull`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

const cancelTransaction = async (req, res) => {
  // pass
};

const getTransactionByUserId = async (req, res) => {
  try {
    const id = req.userId;
    const user = req.user;
    console.log(user);

    const transactions = await TransactionModel.find({ memberId: id }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      success: true,
      message: "Transactions were retured successfully",
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Transactions were retured successfully",
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  cancelTransaction,
  getTransactionByUserId,
  getAllTransactions,
};
