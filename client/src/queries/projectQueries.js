import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
      # description
      # client {
      #   id
      #   firstName
      #   lastName
      #   email
      #   phone
      # }
    }
  }
`;
