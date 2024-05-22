import { Schema } from 'mongoose';
import { Category } from "./category";
import { StatusType } from '../../common';
import * as crypto from "crypto";

export const CategorySchemaMongo = new Schema<Category>({
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    name: { type: String, required: true },
    description: { type: String },
    image: {type: String},
    icon: {type: String },
    status: { type: String, default: StatusType.ACTIVE }
}, {
    versionKey: false,
    timestamps: true,
});

CategorySchemaMongo.methods.toJSON = function () {
    const { _id, ...category } = this.toObject();
    category.id = _id;
    return category;
};