const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require("graphql");

const userType = require("./user");
const experienceType = require("./experience");
const educationType = require("./education");
const socialType = require("./social");

module.exports = new GraphQLObjectType({
  name: "Profile",
  fields: {
    _id: { type: GraphQLID },
    user: { type: userType },
    company: { type: GraphQLString },
    website: { type: GraphQLString },
    location: { type: GraphQLString },
    status: { type: GraphQLString },
    skills: { type: new GraphQLList({ type: GraphQLString }) },
    bio: { type: GraphQLString },
    githubUsername: { type: GraphQLString },
    experience: { type: new GraphQLList(experienceType) },
    education: { type: new GraphQLList(educationType) },
    social: { type: socialType },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
