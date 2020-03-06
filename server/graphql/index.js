const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const query = new GraphQLObjectType({
  name: "Query",
  description: "API to get data",
  fields: () => ({
    posts: require("./queries/getPosts"),
    post: require("./queries/getPost")
  })
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "API to add data",
  fields: () => ({
    signUp: require("./mutation/createUser"),
    logIn: require("./mutation/logIn"),
    createPost: require("./mutation/createPost"),
    updatePost: require("./mutation/updatePost"),
    deletePost: require("./mutation/deletePost"),
    likePost: require("./mutation/likePost"),
    unlikePost: require("./mutation/unlikePost")
  })
});

module.exports = new GraphQLSchema({ query, mutation });
