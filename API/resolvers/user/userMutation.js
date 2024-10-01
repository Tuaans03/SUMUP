const { GraphQLNonNull, GraphQLString } = require("graphql");
const UserType = require("../../schemas/userTypes");
const userDao = require("../../daos/userDao");

const userMutation = {
  addUser: {
    type: UserType,
    args: {
      address: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      image: { type: GraphQLString },
    },
    resolve(parent, args) {
      const userData = {
        address: args.address,
        name: args.name,
        image: args.image,
      };
      return userDao.createUser(userData);
    },
  },
  updateUser: {
    type: UserType,
    args: {
      address: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      image: { type: GraphQLString },
    },
    resolve(parent, args) {
      const updateData = {};
      if (args.name !== undefined) updateData.name = args.name;
      if (args.image !== undefined) updateData.image = args.image;

      return userDao.updateUserByAdress(args.address, updateData);
    },
  },
};

module.exports = userMutation;
