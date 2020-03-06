const { GraphQLInputObjectType, GraphQLID } = require("graphql");

const { getPost, removeLike } = require("../../../services/post.service");
const { verifyLogIn } = require("../../../services/auth.service");

const postType = require("../../types/post");

module.exports = {
  type: postType,
  description: "Remove like from post",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "PostUnlikeInput",
        fields: {
          postId: { type: GraphQLID }
        },
        description: "Input data to remove like from post"
      })
    }
  },
  resolve: async (root, { input }, { request }) => {
    const profile = await verifyLogIn(request.headers);
    const { postId } = input;
    const post = await getPost({ postId });
    const result = await removeLike({ post, profile });
    return result.updated;
  }
};
