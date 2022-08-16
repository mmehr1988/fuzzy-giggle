import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation addClient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
  ) {
    addClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
    ) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;
