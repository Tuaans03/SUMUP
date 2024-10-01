const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");
const { AssetTypeEnum } = require("./assetTypeEnum");
const UserType = require("./userTypes");

const GiftType = new GraphQLObjectType({
  name: "Gift",
  fields: () => ({
    id: { type: GraphQLID },
    giftId: { type: GraphQLString },
    sender: { type: UserType },
    recipientAddress: { type: GraphQLString }, 
    assetType: { type: AssetTypeEnum },
    assetContract: { type: GraphQLString },
    tokenIdOrAmount: { type: GraphQLString },
    amount: { type: GraphQLString },
    isClaimed: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

module.exports = GiftType;
