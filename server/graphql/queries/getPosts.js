const { GraphQLInt, GraphQLList } = require("graphql");

const { getPosts } = require("../../services/post.service");

const postType = require("../types/post");

module.exports = {
  type: new GraphQLList(postType),
  description: "Get list of posts",
  args: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt }
  },
  resolve: async (root, { page, limit }) => {
    return await getPosts({ page, limit });
  }
};
