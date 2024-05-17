import { Collection, getModel } from "../../constant-definitions";
import { Place, PlaceSchemaMongo, User, UserSchemaMongo, Visited, VisitedSchemaMongo } from "../../entities";
import { verifyToken } from "../verify";

export default {
    Query: {
        visited: async (_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<Visited>(Collection.VISITED, VisitedSchemaMongo);
            getModel<Place>(Collection.PLACES, PlaceSchemaMongo);

            const favorites = await model.find({ user: id }).populate("place");
            return favorites;
        },
        isVisited: async (_: any, {place}: { place: string }, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<Visited>(Collection.VISITED, VisitedSchemaMongo);

            const exists = await model.findOne({ user: id, place });
            return exists ? true : false;
        }
    },
    Mutation: {
        createVisited: async (_: any, { place }: { place: string }, ctx: any ) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<Visited>(Collection.VISITED, VisitedSchemaMongo);
            const modelUser = getModel<User>(Collection.USERS, UserSchemaMongo);

            const user = await modelUser.findById(id)
            const exists = await model.findOne({place});

            if(!user)
                return;

            if(exists){
                await model.findOneAndDelete({ place, user: id })
                user.places = user.places <= 0 ? Number(user.places) - 1 : 0;
                await user.save();
                return;
            }
            
            const favorite = new model({ user: id, place });
            user.places = Number(user.places) + 1;
            await user.save();
            const newFavorite = await favorite.save();
            return newFavorite;
        }
    }
}