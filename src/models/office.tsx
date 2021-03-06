import { Company } from "./company"
import { Room } from "./room";

export interface Office {
    id: number;
    companyId: number;
    name: string;
    address: string;
    phoneNumber: string;
    isFavourite: boolean;
    photoFileName: string;
    rooms: any;
    company: Company;
    host: string;
}