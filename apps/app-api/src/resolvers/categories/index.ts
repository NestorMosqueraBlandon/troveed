import { Collection, getModel } from "../../constant-definitions";
import { Category, CategorySchemaMongo } from "../../entities";

export default {
    Query: {
        categories: async () => {
            const model = getModel<Category>(Collection.CATEGORIES, CategorySchemaMongo);
            const categories = await model.find({});
            return categories;

        },
        category: async (_: any, { id }: {id: string} ) => {
            const model = getModel<Category>(Collection.CATEGORIES, CategorySchemaMongo);
            const category = await model.findById(id);
            return category;
        }
    },
    Mutation: {
        createCategory: async (_: any, { data }: any ) => {
            const model = getModel<Category>(Collection.CATEGORIES, CategorySchemaMongo);
            const category = new model(data);
            const newCategory = await category.save();
            return newCategory;
        }
    }
}