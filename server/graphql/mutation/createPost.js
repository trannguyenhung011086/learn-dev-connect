const { GraphQLInputObjectType, GraphQLString } = require("graphql");

const { createPost } = require("../../services/post.service");
const { verifyLogIn } = require("../../services/auth.service");

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
    const profile = await verifyLogIn(request.headers);
    const { text, name } = input;
    const postData = { text, name };
    return await createPost({ postData, profile });
  }
};
