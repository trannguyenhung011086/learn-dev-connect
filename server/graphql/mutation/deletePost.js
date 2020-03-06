const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLBoolean
} = require("graphql");

const { getPost, deletePost } = require("../../services/post.service");
const { verifyLogIn } = require("../../services/auth.service");

module.exports = {
  type: GraphQLBoolean,
  description: "Delete post of current user",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "PostDeleteInput",
        fields: {
          postId: { type: GraphQLID }
        },
        description: "Input data to delete post"
      })
    }
  },
  resolve: async (root, { input }, { request }) => {
    const profile = await verifyLogIn(request.headers);
    const { postId } = input;
    const post = await getPost({ postId });
    await deletePost({ post, profile });
    return true;
  }
};
