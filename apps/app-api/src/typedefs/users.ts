import { gql } from '@apollo/client';

export const usersTypedefs = gql`
    type User {
        id: ID
        name: String
        lastname: String
        photo: String
        email: String
        places: Int
    }

    type Query {
        user: User
        explorers: [User]
    }
`