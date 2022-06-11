import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
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

    setToken = (token: string | null) => {
        this.token = token;
    }

    setApploaded = () => {
        this.appLoaded = true;
    }

    navigateToNotFoundPage = () => {
        window.location.href = `${this.baseURL}/not-found`;
    }

    navigateToURL = (url: string) => {
        window.history.pushState({}, '', url)
        window.location.reload();
    }
}