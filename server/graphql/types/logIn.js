const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "LogIn",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    avatar: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});
