const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString, args: { case: { type: GraphQLString } } },
    username: { type: GraphQLString },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const SessionType = new GraphQLObjectType({
  name: "Session",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    expiresAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const DeleteSessionType = new GraphQLObjectType({
  name: "DeleteSession",
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

const CreateUserInput = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const CreateSessionInput = new GraphQLInputObjectType({
  name: "CreateSessionInput",
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = {
  CreateUserInput,
  CreateSessionInput,
  DeleteSessionType,
  SessionType,
  UserType,
};
