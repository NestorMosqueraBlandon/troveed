import { Collection, getModel } from "../../constant-definitions";
import { Favorite, FavoriteSchemaMongo, Place, PlaceSchemaMongo } from "../../entities";
import { verifyToken } from "../verify";

export default {
    Query: {
        favorites: async (_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<Favorite>(Collection.FAVORITES, FavoriteSchemaMongo);
            getModel<Place>(Collection.PLACES, PlaceSchemaMongo);

            const favorites = await model.find({ user: id }).populate("place");
            return favorites;
        },
        isFavorite: async (_: any, {place}: { place: string }, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<Favorite>(Collection.FAVORITES, FavoriteSchemaMongo);

            const exists = await model.findOne({ user: id, place });
            return exists ? true : false;
        }
    },
    Mutation: {
        createFavorite: async (_: any, { place }: { place: string }, ctx: any ) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const model = getModel<Favorite>(Collection.FAVORITES, FavoriteSchemaMongo);
            const exists = await model.findOne({place, user: id});
            if(exists){
                await model.findOneAndDelete({ place, user: id })
                return;
            }
            
            const favorite = new model({ user: id, place });
            const newFavorite = await favorite.save();
            return newFavorite;
        }
    }
}