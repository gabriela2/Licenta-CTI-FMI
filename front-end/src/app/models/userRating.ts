export interface UserRating{
    id:number;
    rating:number;
    comment:string;
    title:string;
    createdAt:Date;
    receiverId:number;
    senderId:number;
    isValidated:boolean;
    isRejected:boolean;
}