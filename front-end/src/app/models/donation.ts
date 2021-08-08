export interface Donation{
    id:number;
    createdAt:Date;
    amount:number;
    userId:number;
    fundraiserId:number;
    description:string;
}