const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { rootQuery, rootMutation } = require("./resolvers");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: rootQuery,
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: rootMutation,
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
