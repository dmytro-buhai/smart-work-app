import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { InfoUserSubscribe } from "../models/infoUserSubscribe";
import { Room } from "../models/room";
import { SubscribeDetails } from "../models/subscribeDetails";
import { store } from "./store";

export default class SubscribeStore {
    subscribesRegistry = new Map<number, InfoUserSubscribe>();
    subscribeDetailsRegistry = new Map<number, SubscribeDetails>();
    loadingSubscribeDetails = true;
    loadingUserSubscribes = true;

    constructor() {
        makeAutoObservable(this);
    }

    get userSubscribes() {
        if(this.subscribesRegistry.size < 1){
            this.loadUserSubscribes();
        }
        return Array.from(this.subscribesRegistry.values())
    }

    get subscribeDetails(){
        return Array.from(this.subscribeDetailsRegistry.values())
    }
    
    get subscribeDetailsForDay(){
        return Array.from(this.subscribeDetailsRegistry.values()).filter(sd => sd.type === 1);
    }

    get subscribeDetailsForWeek(){
        return Array.from(this.subscribeDetailsRegistry.values()).filter(sd => sd.type === 2);
    }

    get subscribeDetailsForMonth(){
        return Array.from(this.subscribeDetailsRegistry.values()).filter(sd => sd.type === 3);
    }

    loadSubscribeDetailsForRooms = async(rooms: Room[]) => {
        try{
            const roomsSubscribeDetails = await agent.SubDetails.listByRooms(rooms.map(r => r.id));
            roomsSubscribeDetails.forEach(item => {
                this.setSubscribeDetails(item)
            });
            this.setLoadingSubscribeDetails(false);          
        } catch (error){
            console.log(error);
            this.setLoadingSubscribeDetails(false);
        }
    }

    private setSubscribeDetails = (subscribeDetails: SubscribeDetails) => {
        this.subscribeDetailsRegistry.set(subscribeDetails.id, subscribeDetails);
    }

    private setUserSubscribe = (userSubscribe: InfoUserSubscribe) => {
        this.subscribesRegistry.set(userSubscribe.id, userSubscribe);
    }

    setLoadingUserSubscribes = (state: boolean) => {
        this.loadingUserSubscribes = state;
    }

    setLoadingSubscribeDetails = (state: boolean) => {
        this.loadingSubscribeDetails = state;
    }

    loadUserSubscribes = async () => {
        try{
            const username = store.userStore.username!;
            const subscribes = await agent.Subscribe.loadUserSubscribes(username);
            subscribes.forEach(sub => {
                this.setUserSubscribe(sub);
            });
            this.setLoadingUserSubscribes(false);
        } catch(error){
            console.log(error);
            this.setLoadingUserSubscribes(false);
        }  
    }

    selectSubscribe = async (roomId: number, selectedDates: Date[]) => {
        try{
            let orderSubscribe = {
                roomId: roomId,
                username: store.userStore.username!,
                startDate: selectedDates[0],
                endDate: selectedDates[1]
            }
            const orderedSubscribe = await agent.Subscribe.orderUserSubscribe(orderSubscribe)
            this.setUserSubscribe(orderedSubscribe);
            store.modalStore.closeModal();
            store.commonStore.navigateToAccountPage(store.userStore.username!);
        } catch(error){
            throw(error);
        }       
    }

    getSubscribeDetailsForRoom = (roomId: number) => {
        return this.subscribeDetails.filter(sd => sd.roomId === roomId)
    }
}