const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Experience",
  fields: {
    title: { type: GraphQLString },
    company: { type: GraphQLString },
    location: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    current: { type: GraphQLBoolean },
    description: { type: GraphQLString }
  }
});
