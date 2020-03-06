const { GraphQLInt, GraphQLList } = require("graphql");

const { getProfiles } = require("../../../services/profile.service");

const profileType = require("../../types/profile");

module.exports = {
  type: new GraphQLList(profileType),
  description: "Get list of profiles",
  args: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt }
  },
  resolve: async (root, { page, limit }) => {
    return await getProfiles({ page, limit });
  }
};
