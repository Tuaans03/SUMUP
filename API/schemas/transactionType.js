const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    senderAddress: { type: GraphQLString }, 
    recipientAddress: { type: GraphQLString }, 
    assetContract: { type: GraphQLString },
    tokenIdOrAmount: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    timestamp: { type: GraphQLString },
    isSuccess: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

module.exports = TransactionType;
