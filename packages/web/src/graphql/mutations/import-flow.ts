import { gql } from '@apollo/client';

export const IMPORT_FLOW = gql`
  mutation ImportFlow($input: ImportFlowInput) {
    importFlow(input: $input) {
      id
      name
    }
  }
`;
