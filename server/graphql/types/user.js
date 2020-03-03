const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    avatar: { type: GraphQLString },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
