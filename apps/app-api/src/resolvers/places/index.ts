import { Collection, getModel } from "../../constant-definitions";
import { Place, PlaceSchemaMongo } from "../../entities";

export default {
    Query: {
        places: async () => {
            const model = getModel<Place>(Collection.PLACES, PlaceSchemaMongo);
            const places = await model.find({});
            return places;

        },
        place: async (_: any, { id }: {id: string} ) => {
            const model = getModel<Place>(Collection.PLACES, PlaceSchemaMongo);
            const place = await model.findById(id);
            return place;
        },
        nearbyPlaces: async (_: any, { latitude, longitude, maxDistance }: { latitude: number, longitude: number, maxDistance: number }) => {
            const model = getModel<Place>(Collection.PLACES, PlaceSchemaMongo);
            const places = await model.find({
                'location.lat': { $exists: true },
                'location.long': { $exists: true },
                $expr: {
                    $lt: [
                        {
                            $sqrt: {
                                $add: [
                                    { $pow: [{ $subtract: ['$location.lat', latitude] }, 2] },
                                    { $pow: [{ $subtract: ['$location.long', longitude] }, 2] }
                                ]
                            }
                        },
                        maxDistance ? maxDistance : 0.1
                    ]
                }
            });
        
            return places;
        }
    },
    Mutation: {
        createPlace: async (_: any, { data }: any ) => {
            const model = getModel<Place>(Collection.PLACES, PlaceSchemaMongo);
            const place = new model(data);
            const newPlace = await place.save();
            return newPlace;
        }
    }
}