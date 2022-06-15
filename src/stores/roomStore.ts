import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Office } from "../models/office";
import { Pagination, PagingParams } from "../models/pagination";
import { Room } from "../models/room";
import { SubscribeDetail } from "../models/SubscribeDetail";
import { store } from "./store";

export default class RoomStore {
    roomRegistry = new Map<number, Room>();
    selectedRoom: Room | undefined = undefined;
    editMode = false;
    loading = false;
    loadingRooms = false;
    isAddedNewRoom = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);
    }

    private setRoom = (room: Room) => {
        this.roomRegistry.set(room.id, room);
    }

    private getRoom = (id: number) => {
        return this.roomRegistry.get(id);
    }

    setLoadingRooms = (state: boolean) => {
        this.loadingRooms = state;
    }

    loadRoom = async (id: number) => {
        let room = (store.officeStore.selectedOffice?.rooms as Room[]).find(r => r.id === id)
        if(room){
            let subscribeDetails = store.subscribeStore.subscribeDetails.filter(sd => sd.roomId === id)

            let subscribeForDay =  subscribeDetails?.find(sd => sd.type === 1)
            let subscribeForWeek =  subscribeDetails?.find(sd => sd.type === 2)
            let subscribeForMonth =  subscribeDetails?.find(sd => sd.type === 3)

            room.subscribeForDay = subscribeForDay?.price;
            room.subscribeForWeek = subscribeForWeek?.price;
            room.subscribeForMonth = subscribeForMonth?.price;
            
            room.subscribeDetails = subscribeDetails;

            this.selectedRoom = room;
            this.setLoadingRooms(false);
            return room;
        }
        try{
            this.setLoadingRooms(true);
            room = await agent.Rooms.getRoomInfoById(id);
           
            let subscribeForDay =  room.subscribeDetails!.find(r => r.type === 1)
            let subscribeForWeek =  room.subscribeDetails!.find(r => r.type === 2)
            let subscribeForMonth =  room.subscribeDetails!.find(r => r.type === 3)

            room.subscribeForDay = subscribeForDay!.price;
            room.subscribeForWeek = subscribeForWeek!.price;
            room.subscribeForMonth = subscribeForMonth!.price;
            
            this.setRoom(room);
            runInAction(() =>{
                this.selectedRoom = room;
            })
            this.setLoadingRooms(false);
            return room;
        } catch (error: any) {
            console.log(error)
            this.setLoadingRooms(false);
        }
    }

    createRoom = async (room: Room) => {
        this.loading = true;
        try{
            let newRoom = await agent.Rooms.create(room);
            runInAction(() => {
                this.roomRegistry.set(newRoom.id, newRoom);
                this.editMode = false;
                this.loading = false;
            })
            store.officeStore.addRoom(newRoom);
            store.subscribeStore.loadSubscribeDetailsForRoom(newRoom.id)
            store.modalStore.closeModal();
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateRoom = async (room: Room) => {
        this.loading = true;
        try{
            room = this.updateUserSubDetails(room)

            await agent.Rooms.update(room);
            
            console.log(room);

            runInAction(() => {
                this.roomRegistry.set(room.id, room);
                this.selectedRoom = room;
                this.editMode = false;
                this.loading = false;
            })

            store.officeStore.updateRoom(room);
            store.subscribeStore.updateRoomSubscribeDetails(room.subscribeDetails);
            store.modalStore.closeModal();
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private updateUserSubDetails = (room: Room) => {
        room.subscribeDetails[0]!.price = room.subscribeForDay!;
        room.subscribeDetails[1]!.price = room.subscribeForWeek!;
        room.subscribeDetails[2]!.price = room.subscribeForMonth!;

        return room;
    }

    deleteRoom = async (id: number) => {
        this.setLoadingRooms(true);
        try{
            await agent.Rooms.delete(id);
            runInAction(() => {
                this.roomRegistry.delete(id);
            })
            this.setLoadingRooms(false);
            store.commonStore.reloadPage();
        }catch (error) {
            console.log(error);
            this.setLoadingRooms(false);
        }
    }
}