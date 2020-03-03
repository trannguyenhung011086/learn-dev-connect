const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require("graphql");

const userType = require("./user");
const likeType = require("./like");
const commentType = require("./comment");

module.exports = new GraphQLObjectType({
  name: "Post",
  fields: {
    _id: { type: GraphQLID },
    user: { type: userType },
    text: { type: GraphQLString },
    name: { type: GraphQLString },
    avatar: { type: GraphQLString },
    likes: { type: new GraphQLList(likeType) },
    comments: { type: new GraphQLList(commentType) },
    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
});
