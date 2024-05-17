import { gql } from '@apollo/client';

export const visitedTypedefs = gql`
    type Visited {
        id: String
        place: Place
    }

    type Query {
        visited: [Visited]
        isVisited(place: String): Boolean
    }

    type Mutation {
        createVisited(place: String): Visited
    }
`