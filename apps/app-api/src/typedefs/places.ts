import { gql } from '@apollo/client';

export const placesTypedefs = gql`
    type Location {
        country: String
        city: String
        province: String
        address: String
        lat: Float
        long: Float
    }

    type Place {
        id: String
        name: String
        images: [String]
        location: Location
        description: String
    }

    type Query {
        places: [Place]
        place(id: String): Place
        nearbyPlaces(latitude: Float, longitude: Float, maxDistance: Float): [Place]
    }

    input LocationInput {
        country: String
        city: String
        province: String
        address: String
        lat: Float
        long: Float
    }

    input CreatePlaceInput {
        name: String
        description: String
        images: [String]
        location: LocationInput
    }

    type Mutation {
        createPlace(data: CreatePlaceInput): Place
    }
`