import { gql } from '@apollo/client';

export const AUTH = gql`
  mutation Auth($input: AuthInput) {
    auth(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;
