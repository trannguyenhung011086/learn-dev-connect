const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const userType = require("./user");

module.exports = new GraphQLObjectType({
  name: "Comment",
  fields: {
    _id: { type: GraphQLID },
    user: { type: userType },
    text: { type: GraphQLString },
    avatar: { type: GraphQLString },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
