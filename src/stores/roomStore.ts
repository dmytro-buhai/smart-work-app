import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Office } from "../models/office";
import { Pagination, PagingParams } from "../models/pagination";
import { Room } from "../models/room";
import { store } from "./store";

export default class RoomStore {
    roomRegistry = new Map<number, Room>();
    selectedRoom: Room | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
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

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadRoom = async (id: number) => {
        let room = (store.officeStore.selectedOffice?.rooms as Room[]).find(r => r.id === id)
        if(room){
            this.selectedRoom = room;
            return room;
        }
        this.loadingInitial = true;
        try{
            room = await agent.Rooms.getRoomInfoById(id);
            this.setRoom(room!);
            runInAction(() =>{
                this.selectedRoom = room;
            })
            this.setLoadingInitial(false);
            return room;
        } catch (error: any) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    createRoom = async (room: Room) => {
        this.loading = true;
        try{
            let id = await agent.Rooms.create(room);
            runInAction(() => {
                room.id = +id;
                this.roomRegistry.set(room.id, room);
                this.editMode = false;
                this.loading = false;
            })
            store.officeStore.addRoom(room);
            store.subscribeStore.loadSubscribeDetailsForRooms([room])
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
            await agent.Rooms.update(room);
            runInAction(() => {
                this.roomRegistry.set(room.id, room);
                this.selectedRoom = room;
                this.editMode = false;
                this.loading = false;
            })
            store.officeStore.updateRoom(room);
            store.modalStore.closeModal();
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteRoom = async (id: number) => {
        this.loading = true;
        try{
            await agent.Rooms.delete(id);
            runInAction(() => {
                this.roomRegistry.delete(id);
                this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}