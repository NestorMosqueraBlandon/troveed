import { gql } from '@apollo/client';

export const categoriesTypedefs = gql`
    type Category {
        id: String
        name: String
        image: String
        icon: String
        description: String
    }

    type Query {
        categories: [Category]
        category(id: String): Category
    }

    input CreateCategoryInput {
        name: String
        image: String
        icon: String
        description: String
    }

    type Mutation {
        createCategory(data: CreateCategoryInput): Category
    }
`