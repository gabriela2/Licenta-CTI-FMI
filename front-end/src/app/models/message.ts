export interface Message{
    id:number;
    text:string;
    createdAt:Date;
    readAt:Date;
    deletedBySender:boolean;
    deletedByReceiver:boolean;
    senderId:number;
    receiverId:number;
    senderLastName:string;
    senderFirstName:string;
    receiverLastName:string;
    receiverFirstName:string;

}