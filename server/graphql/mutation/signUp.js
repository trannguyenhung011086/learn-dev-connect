const { GraphQLString, GraphQLInputObjectType } = require("graphql");

const { createUser } = require("../../services/user.service");

const userType = require("../types/user");

module.exports = {
  type: userType,
  description: "Create new user",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        }
      }),
      description: "Input data to register new user"
    }
  },
  resolve: async (root, { input }) => {
    return await createUser(input);
  }
};
