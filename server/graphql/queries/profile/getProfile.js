const { GraphQLID } = require("graphql");

const { getProfile } = require("../../../services/profile.service");

const profileType = require("../../types/profile");

module.exports = {
  type: profileType,
  description: "Get profile of user",
  args: {
    userId: { type: GraphQLID },
    profileId: { type: GraphQLID }
  },
  resolve: async (root, { userId }) => {
    return await getProfile({ userId });
  }
};
