import { Rate } from "./rate.model";

export interface Dish {
    id?:string,
    name:string,
    cuisineType:string,
    category:string,
    ingredients:string,
    maxPerDay: number,
    remaining:number,
    price:number,
    description:string,
    imgUrls:string[],
    rating?:Rate[],
    rate?:number|string;
}