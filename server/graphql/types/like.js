const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const userType = require("./user");

module.exports = new GraphQLObjectType({
  name: "Like",
  fields: {
    _id: { type: GraphQLID },
    user: { type: userType },
    created: { type: GraphQLString }
  }
});
