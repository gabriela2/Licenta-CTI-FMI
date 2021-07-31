export interface Demand{
    id?:number;
    createdAt?:Date;
    quantityRequested:number;
    isApproved:boolean;
    deliveryTypeSelected:string;
    userId:number;
    adId:number;
}