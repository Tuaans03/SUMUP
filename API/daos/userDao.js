const User = require("../models/User.model");

const userDao = {
  createUser: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },

  updateUserByAdress: async (address, updateData) => {
    return await User.findOneAndUpdate(
      { address },
      { $set: updateData },
      { new: true }
    );
  },

  findUserByAddress: async (address) => {
    return await User.findOne({ address });
  },

  findAllUsers: async () => {
    return await User.find({});
  },
};

module.exports = userDao;
