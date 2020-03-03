const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const query = new GraphQLObjectType({
  name: "Query",
  description: "API to get data",
  fields: () => ({
    posts: require("./queries/getPosts")
  })
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "API to add data",
  fields: () => ({
    signUp: require("./mutation/createUser"),
    logIn: require("./mutation/logIn"),
    post: require("./mutation/createPost")
  })
});

module.exports = new GraphQLSchema({ query, mutation });
