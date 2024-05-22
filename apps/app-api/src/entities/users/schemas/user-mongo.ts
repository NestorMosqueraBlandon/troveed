import { Schema } from 'mongoose';
import { User } from './user';
import { StatusType } from '../../common';
import * as crypto from "crypto";

export const UserSchemaMongo = new Schema<User>({
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    name: { type: String},
    lastname: { type: String},
    photo: { type: String},
    email: { type: String},
    places: { type: Number, default: 0},
    lastLogin: { type: String },
    status: { type: String, default: StatusType.ACTIVE }
}, {
    versionKey: false,
    timestamps: true,
});

UserSchemaMongo.methods.toJSON = function () {
    const { _id, ...user } = this.toObject();
    user.id = _id;
    return user;
};