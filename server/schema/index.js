const graphql = require("graphql");
const bcrypt = require("bcrypt");
var crypto = require("crypto");

const { Session, User } = require("../models");
const {
  UserType,
  SessionType,
  CreateSessionInput,
  CreateUserInput,
  DeleteSessionType,
} = require("../graphqlTypes");

const { GraphQLObjectType, GraphQLSchema, GraphQLNonNull } = graphql;

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getUser: {
      type: UserType,
      args: {},
      async resolve(parent, args, context) {
        if (context.error) {
          throw context.error;
        }

        return {
          id: context.currentUser.id,
          email: function (args) {
            console.log(args.case);
            return context.currentUser.email.toUpperCase();
          },
          createdAt: context.currentUser.createdAt,
          updatedAt: context.currentUser.updatedAt,
        };
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createSession: {
      type: SessionType,
      args: {
        input: {
          type: new GraphQLNonNull(CreateSessionInput),
        },
      },
      async resolve(parent, args) {
        const creds = {
          username: args.input.username,
        };

        const result = await User.findOne(creds);

        if (!bcrypt.compareSync(args.input.password, result.password)) {
          return null;
        }

        if (result) {
          return new Promise((resolve, reject) => {
            crypto.randomBytes(24, async function (err, buffer) {
              const digest = buffer.toString("hex");
              const date = new Date();

              date.setDate(date.getDate() + 7);

              const session = new Session({
                user: result.id,
                digest: digest,
                expiresAt: date,
              });

              const s = await session.save();

              const key = `${s.id}:${s.digest}`;
              const token = Buffer.from(key).toString("base64");

              resolve({ ...s.toObject(), id: s.id, token });
            });
          });
        } else {
          //TODO to throw error
          return null;
        }
      },
    },
    deleteSession: {
      type: new GraphQLNonNull(DeleteSessionType),
      args: {},
      async resolve(parent, args, context) {
        if (!context.session) {
          return { success: false };
        }

        await Session.findOneAndDelete(context.session.id);

        return { success: true };
      },
    },
    createUser: {
      type: SessionType,
      args: {
        input: { type: new GraphQLNonNull(CreateUserInput) },
      },
      async resolve(parent, args) {
        const isEmailTaken = await User.findOne({ email: args.input.email });
        const isUserTaken = await User.findOne({
          username: args.input.username,
        });

        if (isEmailTaken || isUserTaken) {
          //TODO implement error handling
          return null;
        }

        const user = new User(args.input);

        const u = await user.save();

        return new Promise((resolve, reject) => {
          crypto.randomBytes(24, async function (err, buffer) {
            const digest = buffer.toString("hex");
            const date = new Date();

            date.setDate(date.getDate() + 7);

            const session = new Session({
              user: u.id,
              digest: digest,
              expiresAt: date,
            });

            const s = await session.save();

            const key = `${s.id}:${s.digest}`;
            const token = Buffer.from(key).toString("base64");

            resolve({ ...s.toObject(), id: s.id, token });
          });
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
