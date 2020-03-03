const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const queryType = new GraphQLObjectType({
  name: "Query",
  description: "API to get data",
  fields: () => ({
    posts: require("./queries/getPosts")
  })
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "API to add data",
  fields: () => ({
    signUp: require("./mutation/createUser"),
    logIn: require("./mutation/logIn")
    // post: require("./mutation/createPost")
  })
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = schema;
