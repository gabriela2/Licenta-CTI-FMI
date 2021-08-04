import { Photo } from "./photo";

export default interface Member{
    id:number;
    userName:string;
    email:string;
    lastName:string;
    firstName:string;
    phoneNumber:string;
    createdAt:Date;
    lastActivity:Date;
    isOrganisation:boolean;
    emailConfirmed:boolean;
    stripeAccount:string;
    stripeConfigurationLink:string;
    organizationIdentificationNumber:string;
    photoUrl:string;
    publicId:string;
    iban?: string;
    bank?: string;
    owner?: string;
    stripeLinkWasAccessed?:boolean;
    photos:Photo[];
    test:Photo;
    

    

}