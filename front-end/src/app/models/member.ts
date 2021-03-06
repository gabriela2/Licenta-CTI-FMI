import { UserPhoto } from "./userPhoto";

export default interface Member{
    id:number;
    userName:string;
    email:string;
    lastName:string;
    firstName:string;
    phoneNumber:string;
    createdAt:Date;
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
    photo:UserPhoto;
    

    

}