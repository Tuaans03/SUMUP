const { GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const UserType = require("../../schemas/userTypes");
const userDao = require("../../daos/userDao");

const userQuery = {
  user: {
    type: UserType,
    args: {
      address: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return userDao.findUserByAddress({ address: args.address });
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      return userDao.findAllUsers();
    },
  },
};

module.exports = userQuery;
