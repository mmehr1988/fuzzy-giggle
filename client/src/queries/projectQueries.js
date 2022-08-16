import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getClients {
    projects {
      name
      status
      description
      id
      client {
        id
        firstName
        lastName
        email
        phone
      }
    }
  }
`;
