const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const queryType = new GraphQLObjectType({
  name: "Query",
  description: "API to get data",
  fields: () => ({
    hello: require("./queries/hello")
  })
});

const schema = new GraphQLSchema({ query: queryType });

module.exports = schema;
