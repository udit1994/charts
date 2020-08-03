const cors = require("cors");
const crypto = require("crypto");
const express = require("express");
const graphql = require("graphql");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");
const Session = require("./models/Session");
const User = require("./models/User");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(cors());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Conneted to the database.");
});

const setContext = async (req) => {
  const token = req.headers["x-token"];

  if (!token) {
    return {};
  }

  try {
    const decodedToken = Buffer.from(req.headers["x-token"], "base64").toString(
      "utf-8"
    );
    const [sessionId, digest] = decodedToken.split(":");

    if (!sessionId || !digest) {
      throw new Error();
    }

    const session = await Session.findById(sessionId);
    const isSessionValid =
      session &&
      crypto.timingSafeEqual(
        Buffer.from(digest, "utf8"),
        Buffer.from(session.digest, "utf8")
      );

    if (!isSessionValid) {
      throw new Error();
    }

    const date = new Date();
    session.expiresAt = date.setDate(date.getDate() + 7);
    await session.save();

    const currentUser = await User.findById(session.user);

    return { currentUser, session };
  } catch (e) {
    const err = new graphql.GraphQLError(
      "Invalid access token!",
      null,
      null,
      null,
      null,
      null,
      { code: "UNAUTHORIZED" }
    );

    return { error: err };
  }
};

// TODO: Test production build
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile("build/index.html");
  });
}

app.use(
  "/graphql",
  graphqlHTTP(async (request, response, graphQLParams) => ({
    schema,
    context: await setContext(request),
    graphiql: true,
  }))
);

app.listen(4000, () => {
  console.log("Listening for requests on port 4000");
});
