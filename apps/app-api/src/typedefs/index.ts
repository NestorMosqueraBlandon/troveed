import { authTypedefs } from "./auth";
import { categoriesTypedefs } from "./categories";
import { favoritesTypedefs } from "./favorites";
import { placesTypedefs } from "./places";
import { usersTypedefs } from "./users";
import { visitedTypedefs } from "./visited";

const typeDefs = [
    placesTypedefs,
    authTypedefs,
    usersTypedefs,
    categoriesTypedefs,
    favoritesTypedefs,
    visitedTypedefs
]

export default typeDefs;