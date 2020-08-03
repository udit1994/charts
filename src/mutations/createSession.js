import gql from "graphql-tag";

const CREATE_SESSION = gql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    createSession(input: $input) {
      id
      token
      expiresAt
      createdAt
      updatedAt
    }
  }
`;

export default CREATE_SESSION;
