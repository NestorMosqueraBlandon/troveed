import { Schema } from 'mongoose';
import { Visited } from "./visited";
import { StatusType } from '../../common';

export const VisitedSchemaMongo = new Schema<Visited>({
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    place: { type: String, ref: "places" },
    user: { type: String, ref: "users" },
    status: { type: String, default: StatusType.ACTIVE }
}, {
    versionKey: false,
    timestamps: true,
});

VisitedSchemaMongo.methods.toJSON = function () {
    const { _id, ...visited } = this.toObject();
    visited.id = _id;
    return visited;
};