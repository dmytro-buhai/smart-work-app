import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;
    baseURL: string = 'http://localhost:3000'

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setApploaded = () => {
        this.appLoaded = true;
    }

    navigateToNotFoundPage = () => {
        window.location.href = `${this.baseURL}/not-found`;
    }

    navigateToServerErrorPage = () => {
        window.location.href = `${this.baseURL}/server-error`;
    }

    navigateToURL = (url: string) => {
        window.history.pushState({}, '', url)
        window.location.reload();
    }
}