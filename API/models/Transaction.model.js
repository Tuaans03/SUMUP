const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  senderAddress: { type: String, required: true }, 
  recipientAddress: { type: String, required: true }, 
  assetContract: { type: String, required: true },
  tokenIdOrAmount: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  isSuccess: { type: Boolean, default: false },
  message: { type: String },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
