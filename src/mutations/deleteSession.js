import gql from "graphql-tag";

const DELETE_SESSION = gql`
  mutation DeleteSessionMutation {
    deleteSession {
      success
    }
  }
`;

export default DELETE_SESSION;
