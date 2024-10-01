const Transaction = require("../models/Transaction.model");

const transactionDao = {
  // Tạo transaction mới
  createTransaction: async (transactionData) => {
    try {
      const transaction = new Transaction(transactionData);
      return await transaction.save();
    } catch (error) {
      throw error;
    }
  },

  // Tìm transaction theo ID
  getTransactionById: async (id) => {
    try {
      return await Transaction.findById(id);
    } catch (error) {
      throw error;
    }
  },

  // Lấy tất cả transactions
  getAllTransactions: async () => {
    try {
      return await Transaction.find({});
    } catch (error) {
      throw error;
    }
  },

  // Lấy transactions bởi senderAddress
  getTransactionsBySenderAddress: async (senderAddress) => {
    try {
      return await Transaction.find({ senderAddress });
    } catch (error) {
      throw error;
    }
  },

  // Lấy transactions bởi recipientAddress
  getTransactionsByRecipientAddress: async (recipientAddress) => {
    try {
      return await Transaction.find({ recipientAddress });
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật transaction theo ID
  updateTransactionById: async (id, updateData) => {
    try {
      return await Transaction.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  },

  // Xóa transaction theo ID
  deleteTransactionById: async (id) => {
    try {
      return await Transaction.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = transactionDao;
