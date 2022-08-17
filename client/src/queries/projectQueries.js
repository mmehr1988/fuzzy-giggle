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

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      status
      description
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
