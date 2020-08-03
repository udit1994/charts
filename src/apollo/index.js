import { ApolloClient, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "apollo-link-context";
import cache from "./cache";
import { getToken, clearToken } from "lib/auth";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      if (extensions?.code === "UNAUTHORIZED") {
        clearToken();
      }
      return null;
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:4000/graphql",
});

const authLink = setContext((_, { headers = {} }) => {
  const newHeaders = headers;
  const token = getToken();

  if (token) {
    newHeaders["x-token"] = token;
  }

  return { headers: newHeaders };
});

export default new ApolloClient({
  connectToDevTools: true,
  link: authLink.concat(errorLink.concat(httpLink)),
  cache,
});
