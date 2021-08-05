import { Ad_x_DeliveryType } from "./ad_x_deliveryType";
import { Demand } from "./demand";
import { Photo } from "./photo";

export interface Ad
{
    id:number;
    name:string;
    description:string;
    createdAt:Date;
    quantity: number;
    existsLimit:boolean;
    limit?:number;
    isActive:boolean;
    url:string;
    userId:number;
    unitOfMeasure:string;
    category:string;
    unitOfMeasureId:number;
    categoryId:number;
    photos: Photo[];
    ad_x_DeliveryType: Ad_x_DeliveryType[];
    demands:Demand[];
}