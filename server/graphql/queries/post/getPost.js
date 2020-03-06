const { GraphQLID } = require("graphql");

const { getPost } = require("../../../services/post.service");

const postType = require("../../types/post");

module.exports = {
  type: postType,
  description: "Get a post",
  args: {
    postId: { type: GraphQLID }
  },
  resolve: async (root, { postId }) => {
    return await getPost({ postId });
  }
};
