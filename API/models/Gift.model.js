const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  giftId: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientAddress: { type: String, required: true }, // Thay đổi ở đây
  assetType: {
    type: String,
    enum: ["ERC20", "ERC721", "ERC1155"],
    required: true,
  },
  assetContract: { type: String, required: true },
  tokenIdOrAmount: { type: String, required: true },
  amount: { type: String, required: true },
  isClaimed: { type: Boolean, default: false },
  message: { type: String },
});

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift;
