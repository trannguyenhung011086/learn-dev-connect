const { GraphQLString, GraphQLInputObjectType } = require("graphql");

const { verifyUser, grantToken } = require("../../services/auth.service");

const logInType = require("../types/logIn");

module.exports = {
  type: logInType,
  description: "Log in current user",
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "LogInInput",
        fields: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        }
      }),
      description: "Input data to log in"
    }
  },
  resolve: async (root, { input }) => {
    const { email, password } = input;
    const user = await verifyUser({ email, password });
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
    const token = grantToken(payload);
    return { ...payload, token };
  }
};
