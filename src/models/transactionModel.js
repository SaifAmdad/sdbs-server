const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    accountantId: {
      type: Schema.Types.ObjectId,
      required: [true, "Accountant ID is required"],
      ref: "user",
    },
    accountantName: {
      type: String,
      required: [true, "Accountant name is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    updator: {
      type: String,
      default: "Creator",
    },
    memberName: {
      type: String,
      required: [true, "Member name is required"],
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Member ID is required"],
    },
    month: {
      type: String,
      required: [true, "Month is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
  },
  { timestamps: true },
);

const TransactionModel = model("transaction", transactionSchema);

module.exports = TransactionModel;
