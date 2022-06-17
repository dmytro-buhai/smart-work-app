import { User } from "./user";

export interface Profile{
    username: string;
    email?: string;
    displayName?: string;
    image?: string;
    phoneNumber?: string;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.email = user.email;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: string;
}