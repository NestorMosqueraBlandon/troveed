import { Collection, getModel } from "../../constant-definitions";
import { User, UserSchemaMongo } from "../../entities";
import { verifyToken } from "../verify";

export default {
    Query: {
        user: async(_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<User>(Collection.USERS, UserSchemaMongo);
            const user = await model.findById(id);
            return user;
        },
        explorers: async() => {
            const model = getModel<User>(Collection.USERS, UserSchemaMongo);
            const usersWithPlacesCount = await model.find().sort({ places: -1 });

              return usersWithPlacesCount;
        }
    }
}