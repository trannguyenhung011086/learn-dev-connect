const { GraphQLInputObjectType, GraphQLString, GraphQLID } = require("graphql");

const { getPost, updatePost } = require("../../../services/post.service");
const { verifyLogIn } = require("../../../services/auth.service");

const postType = require("../../types/post");

module.exports = {
  type: postType,
  description: "Update post of current user",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "PostUpdateInput",
        fields: {
          postId: { type: GraphQLID },
          text: { type: GraphQLString },
          name: { type: GraphQLString }
        },
        description: "Input data to update post"
      })
    }
  },
  resolve: async (root, { input }, { request }) => {
    const profile = await verifyLogIn(request.headers);
    const { postId, text, name } = input;
    const update = { text, name };
    const post = await getPost({ postId });
    return await updatePost({ post, update, profile });
  }
};
