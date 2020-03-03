const { GraphQLInt, GraphQLList } = require("graphql");

const { createPost } = require("../../services/post.service");

const postType = require("../types/post");

module.exports = {
  type: postType,
  description: "Create new post",
  args: {
    input: {
      postData: { type: postType }
    }
  },
  resolve: async (root, { input }) => {
    return await createPost(input.postData, input.profile);
  }
};
