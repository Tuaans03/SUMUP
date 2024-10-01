const { userQuery, userMutation } = require("./user");
const { giftQuery, giftMutation } = require("./gift");
const { transactionQuery, transactionMutation } = require("./transaction");

const rootQuery = {
  ...userQuery,
  ...giftQuery,
  ...transactionQuery,
};

const rootMutation = {
  ...userMutation,
  ...giftMutation,
  ...transactionMutation,
};

module.exports = {
  rootQuery,
  rootMutation,
};
