const { GraphQLNonNull, GraphQLString, GraphQLBoolean,GraphQLID } = require("graphql");
const GiftType = require("../../schemas/giftType");
const giftDao = require("../../daos/giftDao");
const { AssetTypeEnum } = require("../../schemas/assetTypeEnum");
const userDao = require("../../daos/userDao");

const giftMutation = {
  addGift: {
    type: GiftType,
    args: {
      giftId: { type: new GraphQLNonNull(GraphQLString) },
      senderAddress: { type: new GraphQLNonNull(GraphQLString) },
      recipientAddress: { type: new GraphQLNonNull(GraphQLString) },
      assetType: { type: new GraphQLNonNull(AssetTypeEnum) },
      assetContract: { type: new GraphQLNonNull(GraphQLString) },
      tokenIdOrAmount: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: new GraphQLNonNull(GraphQLString) },
      message: { type: GraphQLString },
    },
    async resolve(parent, args) {
      // Tìm sender theo address
      const sender = await userDao.findUserByAddress(args.senderAddress);

      if (!sender) {
        throw new Error("Sender không tồn tại");
      }

      const giftData = {
        giftId: args.giftId,
        sender: sender._id,
        recipientAddress: args.recipientAddress, // Lưu trực tiếp địa chỉ người nhận
        assetType: args.assetType,
        assetContract: args.assetContract,
        tokenIdOrAmount: args.tokenIdOrAmount,
        amount: args.amount,
        message: args.message,
      };
      return giftDao.createGift(giftData);
    },
  },

  updateGift: {
    type: GiftType,
    args: {
      giftId: { type: new GraphQLNonNull(GraphQLString) },
      isClaimed: { type: GraphQLBoolean },
      message: { type: GraphQLString },
    },
    resolve(parent, args) {
      const updateData = {};
      if (args.isClaimed !== undefined) updateData.isClaimed = args.isClaimed;
      if (args.message !== undefined) updateData.message = args.message;

      return giftDao.updateGiftByGiftId(args.giftId, updateData);
    },
  },

  deleteGift: {
    type: GiftType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return giftDao.deleteGiftById(args.id);
    },
  },
};

module.exports = giftMutation;
