import { gql } from '@apollo/client';

export const authTypedefs = gql`
    type AuthPayload {
        token: String
    }

    type Mutation {
        userLoginGoogle(email: String!, name: String, photo: String, lastname: String): AuthPayload
    }
`