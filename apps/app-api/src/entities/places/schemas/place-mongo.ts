import { Schema } from 'mongoose';
import { Place } from "./place";
import { StatusType } from '../../common';

export const PlaceSchemaMongo = new Schema<Place>({
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    name: { type: String, required: true },
    description: { type: String },
    location: {
        country: { type: String },
        city: { type: String },
        province: { type: String },
        address: { type: String },
        lat: { type: Number },
        long: { type: Number },
    },
    images: [{
        type: String
    }],
    reviews: [{
        user: { type: String },
        text: { type: String },
        photos: [{ type: String }],
    }],
    activities: [{ type: String }],
    category: { type: String, ref: "categories" },
    status: { type: String, default: StatusType.ACTIVE }
}, {
    versionKey: false,
    timestamps: true,
});

PlaceSchemaMongo.methods.toJSON = function () {
    const { _id, ...place } = this.toObject();
    place.id = _id;
    return place;
};