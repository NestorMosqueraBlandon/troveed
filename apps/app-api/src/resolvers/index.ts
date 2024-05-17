import auth from "./auth";
import categories from "./categories";
import favorites from "./favorites";
import places from "./places";
import users from "./users";
import visited from "./visited";

export default {
    Query: {
        ...places.Query,
        ...users.Query,
        ...categories.Query,
        ...favorites.Query,
        ...visited.Query
    },
    Mutation: {
        ...places.Mutation,
        ...auth.Mutation,
        ...categories.Mutation,
        ...favorites.Mutation,
        ...visited.Mutation
    }
}