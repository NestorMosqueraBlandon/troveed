import { Schema } from 'mongoose';
import { Favorite } from "./favorite";
import { StatusType } from '../../common';
import * as crypto from "crypto";

export const FavoriteSchemaMongo = new Schema<Favorite>({
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    place: { type: String, ref: "places" },
    user: { type: String, ref: "users" },
    status: { type: String, default: StatusType.ACTIVE }
}, {
    versionKey: false,
    timestamps: true,
});

FavoriteSchemaMongo.methods.toJSON = function () {
    const { _id, ...favorite } = this.toObject();
    favorite.id = _id;
    return favorite;
};