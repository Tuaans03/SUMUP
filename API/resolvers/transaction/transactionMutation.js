const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');
const TransactionType = require('../../schemas/transactionType');
const transactionDao = require('../../daos/transactionDao');

const transactionMutation = {
  addTransaction: {
    type: TransactionType,
    args: {
      senderAddress: { type: new GraphQLNonNull(GraphQLString) }, // Thay đổi ở đây
      recipientAddress: { type: new GraphQLNonNull(GraphQLString) }, // Thay đổi ở đây
      assetContract: { type: new GraphQLNonNull(GraphQLString) },
      tokenIdOrAmount: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
      isSuccess: { type: GraphQLBoolean },
      message: { type: GraphQLString },
    },
    resolve(parent, args) {
      const transactionData = {
        senderAddress: args.senderAddress, // Thay đổi ở đây
        recipientAddress: args.recipientAddress, // Thay đổi ở đây
        assetContract: args.assetContract,
        tokenIdOrAmount: args.tokenIdOrAmount,
        amount: args.amount,
        timestamp: args.timestamp,
        isSuccess: args.isSuccess,
        message: args.message,
      };
      return transactionDao.createTransaction(transactionData);
    },
  },
  updateTransaction: {
    type: TransactionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      isSuccess: { type: GraphQLBoolean },
      message: { type: GraphQLString },
    },
    resolve(parent, args) {
      const updateData = {};
      if (args.isSuccess !== undefined) updateData.isSuccess = args.isSuccess;
      if (args.message !== undefined) updateData.message = args.message;

      return transactionDao.updateTransactionById(args.id, updateData);
    },
  },
  deleteTransaction: {
    type: TransactionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return transactionDao.deleteTransactionById(args.id);
    },
  },
};

module.exports = transactionMutation;
