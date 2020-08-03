import gql from "graphql-tag";

const SET_SESSION = gql`
  mutation SetSessionMutation($token: String!) {
    setSession(token: $token) @client
  }
`;

export default SET_SESSION;
