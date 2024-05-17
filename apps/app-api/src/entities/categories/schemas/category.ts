import { Base } from "../../common";

export interface Category extends Base {
    name: string;
    description: string;
    icon: string;
    image: string;
}