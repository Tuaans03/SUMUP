const {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const GiftType = require("../../schemas/giftType")
const giftDao = require("../../daos/giftDao");

const giftQuery = {
  // Tìm gift theo id hoặc giftId
  gift: {
    type: GiftType,
    args: {
      id: { type: GraphQLID },
      giftId: { type: GraphQLString },
    },
    resolve(parent, args) {
      if (args.id) {
        return giftDao.getGiftById(args.id);
      } else if (args.giftId) {
        return giftDao.getGiftByGiftId(args.giftId);
      } else {
        throw new Error("Bạn phải cung cấp id hoặc giftId");
      }
    },
  },

  // Lấy tất cả gifts
  gifts: {
    type: new GraphQLList(GiftType),
    resolve(parent, args) {
      return giftDao.getAllGifts();
    },
  },

  // Lấy gifts bởi địa chỉ
  giftsByAddress: {
    type: new GraphQLList(GiftType),
    args: {
      address: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return giftDao.getGiftsByAddress(args.address);
    },
  },

  // Lấy gifts bởi recipientAddress
  giftsByRecipientAddress: {
    type: new GraphQLList(GiftType),
    args: {
      recipientAddress: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return giftDao.getGiftsByRecipientAddress(args.recipientAddress);
    },
  },
};

module.exports = giftQuery;
