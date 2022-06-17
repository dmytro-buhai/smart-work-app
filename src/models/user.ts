export {}

export interface User {
    email: string;
    username: string;
    displayName: string;
    token: string;
    phoneNumber: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    passwordConfirm?: string;
}