const { GraphQLInputObjectType, GraphQLID } = require("graphql");

const { getPost, addLike } = require("../../services/post.service");
const { verifyLogIn } = require("../../services/auth.service");

const postType = require("../types/post");

module.exports = {
  type: postType,
  description: "Add like to post",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "PostLikeInput",
        fields: {
          postId: { type: GraphQLID }
        },
        description: "Input data to like post"
      })
    }
  },
  resolve: async (root, { input }, { request }) => {
    const profile = await verifyLogIn(request.headers);
    const { postId } = input;
    const post = await getPost({ postId });
    const result = await addLike({ post, profile });
    return result.updated;
  }
};
