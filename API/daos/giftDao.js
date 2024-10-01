const Gift = require("../models/Gift.model");

const giftDao = {
  // Tạo gift mới
  createGift: async (giftData) => {
    try {
      const gift = new Gift(giftData);
      return await gift.save();
    } catch (error) {
      throw error;
    }
  },

  // Tìm gift theo ID
  getGiftById: async (id) => {
    try {
      return await Gift.findById(id).populate("sender");
    } catch (error) {
      throw error;
    }
  },

  // Tìm gift theo giftId
  getGiftByGiftId: async (giftId) => {
    try {
      return await Gift.findOne({ giftId }).populate("sender");
    } catch (error) {
      throw error;
    }
  },

  // Lấy tất cả gifts
  getAllGifts: async () => {
    try {
      return await Gift.find({}).populate("sender");
    } catch (error) {
      throw error;
    }
  },

  // Lấy gifts bởi địa chỉ (sender hoặc recipientAddress)
  getGiftsByAddress: async (address) => {
    try {
      const gifts = await Gift.find({}).populate("sender");

      // Lọc gifts mà sender hoặc recipientAddress có địa chỉ trùng khớp
      return gifts.filter(
        (gift) =>
          gift.sender.address === address || gift.recipientAddress === address
      );
    } catch (error) {
      throw error;
    }
  },

  // Lấy gifts bởi recipientAddress
  getGiftsByRecipientAddress: async (recipientAddress) => {
    try {
      return await Gift.find({ recipientAddress }).populate("sender");
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật gift theo giftId
  updateGiftByGiftId: async (giftId, updateData) => {
    try {
      return await Gift.findOneAndUpdate({ giftId }, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  },

  // Xóa gift theo ID
  deleteGiftById: async (id) => {
    try {
      return await Gift.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = giftDao;
