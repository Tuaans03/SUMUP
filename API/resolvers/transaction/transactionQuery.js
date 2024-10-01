const {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');
const TransactionType = require('../../schemas/transactionType');
const transactionDao = require('../../daos/transactionDao');

const transactionQuery = {
  transaction: {
    type: TransactionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return transactionDao.getTransactionById(args.id);
    },
  },
  transactions: {
    type: new GraphQLList(TransactionType),
    resolve(parent, args) {
      return transactionDao.getAllTransactions();
    },
  },
  transactionsBySender: {
    type: new GraphQLList(TransactionType),
    args: {
      senderAddress: { type: new GraphQLNonNull(GraphQLString) }, // Thay đổi ở đây
    },
    resolve(parent, args) {
      return transactionDao.getTransactionsBySenderAddress(args.senderAddress);
    },
  },
  transactionsByRecipient: {
    type: new GraphQLList(TransactionType),
    args: {
      recipientAddress: { type: new GraphQLNonNull(GraphQLString) }, // Thay đổi ở đây
    },
    resolve(parent, args) {
      return transactionDao.getTransactionsByRecipientAddress(
        args.recipientAddress
      );
    },
  },
};

module.exports = transactionQuery;
