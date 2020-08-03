import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      token
      expiresAt
      createdAt
      updatedAt
    }
  }
`;

export default CREATE_USER;
