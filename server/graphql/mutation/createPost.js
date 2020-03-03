const { GraphQLInputObjectType, GraphQLString } = require("graphql");

const { createPost } = require("../../services/post.service");
const {
  getTokenFromHeaders,
  checkBlacklistToken,
  verifyToken
} = require("../../services/auth.service");

const postType = require("../types/post");

module.exports = {
  type: postType,
  description: "Create new post",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "PostInput",
        fields: {
          text: { type: GraphQLString },
          name: { type: GraphQLString }
        },
        description: "Input data to create post"
      })
    }
  },
  resolve: async (root, { input }, { request }) => {
    const token = getTokenFromHeaders(request.headers);
    await checkBlacklistToken(token);
    const decoded = verifyToken(token);

    const { text, name } = input;

    return await createPost({ postData: { text, name }, profile: decoded });
  }
};
