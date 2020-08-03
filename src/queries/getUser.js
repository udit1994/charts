import gql from "graphql-tag";

const GET_USER = gql`
  query GetUser {
    getUser {
      createdAt
      email
      firstName
      id
      lastName
      updatedAt
      username
    }
  }
`;

export default GET_USER;
