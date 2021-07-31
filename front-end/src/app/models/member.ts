import { Ad } from "./ad";
import { Address } from "./address";
import { Demand } from "./demand";
import { Donation } from "./donation";
import { Fundraiser } from "./fundraiser";
import { UserRating } from "./userRating";

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
    

}