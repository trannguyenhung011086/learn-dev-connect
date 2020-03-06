const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Education",
  fields: {
    school: { type: GraphQLString },
    degree: { type: GraphQLString },
    fieldOfStudy: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    current: { type: GraphQLBoolean },
    description: { type: GraphQLString }
  }
});
