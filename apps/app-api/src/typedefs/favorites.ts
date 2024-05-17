import { gql } from '@apollo/client';

export const favoritesTypedefs = gql`
    type Favorite {
        id: String
        place: Place
    }

    type Query {
        favorites: [Favorite]
        isFavorite(place: String): Boolean
    }

    type Mutation {
        createFavorite(place: String): Favorite
    }
`