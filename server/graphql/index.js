const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const query = new GraphQLObjectType({
  name: "Query",
  description: "API to get data",
  fields: () => ({
    getPosts: require("./queries/post/getPosts"),
    getPost: require("./queries/post/getPost"),
    getProfiles: require("./queries/profile/getProfiles"),
    getProfile: require("./queries/profile/getProfile")
  })
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "API to change data",
  fields: () => ({
    signUp: require("./mutation/signUp"),
    logIn: require("./mutation/logIn"),
    createPost: require("./mutation/post/createPost"),
    updatePost: require("./mutation/post/updatePost"),
    deletePost: require("./mutation/post/deletePost"),
    likePost: require("./mutation/post/likePost"),
    unlikePost: require("./mutation/post/unlikePost"),
    createProfile: require("./mutation/profile/createProfile"),
    updateProfile: require("./mutation/profile/updateProfile")
  })
});

module.exports = new GraphQLSchema({ query, mutation });
