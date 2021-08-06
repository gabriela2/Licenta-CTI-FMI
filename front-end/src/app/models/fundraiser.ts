import { Donation } from "./donation";
import { Photo } from "./photo";

export interface Fundraiser {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    currentAmount: number;
    targetAmount: number;
    isValidated: boolean;
    isRejected:boolean;
    url: string;
    userId: number;
    photos: Photo[];
}