import { Base } from "../../common";

interface Location {
    country: string;
    city: string;
    province: string;
    address: string;
    lat: number;
    long: number;
}

interface Review {
    user: string;
    text: string;
    photos: string[];
}

export interface Place extends Base {
    name: string;
    description: string;
    location: Location;
    images: string[];
    reviews: Review[];
    activities: string[];
    category: string;
}