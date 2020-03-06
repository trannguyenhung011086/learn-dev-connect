const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require("graphql");

const {
  getProfile,
  updateProfile
} = require("../../../services/profile.service");
const { verifyLogIn } = require("../../../services/auth.service");

const profileType = require("../../types/profile");
const experienceType = require("../../types/experience");
const educationType = require("../../types/education");
const socialType = require("../../types/social");

module.exports = {
  type: profileType,
  description: "Update profile of current user",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "ProfileUpdateInput",
        fields: {
          user: { type: GraphQLID },
          company: { type: GraphQLString },
          website: { type: GraphQLString },
          location: { type: GraphQLString },
          status: { type: GraphQLString },
          skills: { type: new GraphQLList({ type: GraphQLString }) },
          bio: { type: GraphQLString },
          githubUsername: { type: GraphQLString },
          experience: { type: experienceType },
          education: { type: educationType },
          social: { type: socialType }
        },
        description: "Input data to update profile"
      })
    }
  },
  resolve: async (root, { input }, { request }) => {
    const profileData = await verifyLogIn(request.headers);
    const profile = await getProfile({ userId: profileData.id });
    await updateProfile({ profile, input });
  }
};
