const { GraphQLObjectType, GraphQLString } = require("graphql");

const helloType = new GraphQLObjectType({
  name: "Hello",
  fields: {
    text: { type: GraphQLString }
  }
});

module.exports = {
  type: helloType,
  description: "hello world",
  resolve(_, args, context) {
    return { text: "test" };
  }
};
