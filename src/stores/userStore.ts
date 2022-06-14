import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";


export default class UserStore {
    user: User | null = null;
    loading: boolean = false;
    adminHostName: string = 'admin'

    constructor() {
        makeAutoObservable(this)
    }

    get username() {
        return this.user?.username 
    }

    get isLoggedIn(){
        return !!this.user 
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            store.modalStore.closeModal();
            store.subscribeStore.loadUserSubscribes();
            store.commonStore.reloadPage();
        } catch(error){
            throw(error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        store.commonStore.reloadPage();
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error){
            console.log(error);            
        }
    }

    checkHostName = (host: string | null) => {
        return this.user?.username === this.adminHostName ?
                                       true :
                                       this.user?.username === host;
    }

    checkAdminName = () => {
        return this.user?.username === this.adminHostName;                          
    }

    register = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            store.modalStore.closeModal();
        } catch(error){
            throw(error);
        }
    }

    update = async (user: User) => {
        this.setLoading(true);
        try{
            await agent.Account.update(user);
            this.user = await agent.Account.current()
            this.setLoading(false);
            store.modalStore.closeModal();
        } catch(error){
            this.setLoading(false);
            store.modalStore.closeModal();
            throw(error);
        }
    }

    private setLoading = (state: boolean) => {
        this.loading = state;
    }
}
