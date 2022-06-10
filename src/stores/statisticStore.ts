import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { DetailStatistic } from "../models/detailStatistic";
import { Room } from "../models/room";
import { SubscribeDetails } from "../models/subscribeDetails";

export default class StatisticStore {
    statisticRegistry = new Map<number, DetailStatistic>();
    subscribeDetailsRegistry = new Map<number, SubscribeDetails>();
    selectedStatistic: DetailStatistic[] | undefined = undefined;
    selectedRoomId: number | undefined;
    loadingInitial = true;
    loading = false;
    loadingSubscribeDetails = true;

    constructor() {
        makeAutoObservable(this)
    }

    get currentSelectedStatistic() {
        return this.selectedStatistic;
    }

    get statistics(){
        return Array.from(this.statisticRegistry.values())
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

    loadStatisticsForRoom = async (roomId: number) => {
        this.setLoading(true);
        this.setSelectedStatisticDetails(undefined);

        let data = this.statistics.filter(s => s.roomId === roomId)

        console.log(data);

        if (data.length > 0){
            this.setSelectedStatisticDetails(data)
            this.setSelectedRoomId(roomId);
            this.setLoading(false);

        } else {
            try{
                const detailedStatistics = await agent.Statistics.listByRoom(roomId);
                detailedStatistics.forEach(statistic => {
                    console.log(statistic?.description)
                    this.setDetailStatistic(statistic);
                })
                this.setSelectedStatisticDetails(detailedStatistics)
                this.setSelectedRoomId(roomId);
                this.setLoading(false);
            } catch (error){
                console.log(error);
                this.setLoading(false);
            }
        }
    }

    loadSubscribeDetailsForRooms = async(rooms: Room[]) => {
        try{
            const roomsSubscribeDetails = await agent.SubDetails.listByRooms(rooms.map(r => r.id));
            roomsSubscribeDetails.forEach(item => {
                this.setSubscribeDetails(item)
            });
            this.setLoadingInitial(false);
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setLoadingSubscribeDetails = (state: boolean) => {
        this.loadingSubscribeDetails = state;
    }

    setSelectedStatisticDetails = (statisticDetals: DetailStatistic[] | undefined) => {
        this.selectedStatistic = statisticDetals;
    }

    setSelectedRoomId = (roomId: number | undefined) => {
        this.selectedRoomId = roomId
    }

    private getDetailStatistic = (id: number) => {
        return this.statisticRegistry.get(id);
    }

    private setDetailStatistic = (statistic: DetailStatistic) => {
        this.statisticRegistry.set(statistic.id, statistic);
    }

    private setSubscribeDetails = (subscribeDetails: SubscribeDetails) => {
        this.subscribeDetailsRegistry.set(subscribeDetails.id, subscribeDetails);
    }

    private getSubscribeDetails = (id: number) => {
        return this.subscribeDetailsRegistry.get(id);
    }
}