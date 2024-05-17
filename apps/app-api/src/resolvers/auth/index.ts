import { Collection, getModel } from "../../constant-definitions";
import { User, UserSchemaMongo } from "../../entities";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export default {
    Mutation: {
        userLoginGoogle: async(_: any, {name, lastname, email, photo}: { name: string, lastname: string, email: string, photo: string }) => {
            const model = getModel<User>(Collection.USERS, UserSchemaMongo);
            let user = await model.findOne({ email });

            if(!user){
                const newUser = new model({name, lastname, email, photo})
                await newUser.save();
                user = newUser;
            }

            user.lastLogin = new Date().toString();

            const token = sign({id: user.id}, JWT_SECRET!, { expiresIn: '15d' });

            return { token }
        }
    }
}