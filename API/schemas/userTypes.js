const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parent) {
        return parent._id.toString(); // Chuyển ObjectId thành chuỗi
      },
    },
    address: { type: GraphQLString },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

module.exports = UserType;
