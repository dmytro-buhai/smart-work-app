import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { DetailStatistic } from "../models/detailStatistic";
import { Statistic } from "../models/statistic";

export default class StatisticStore {
    statisticRegistry = new Map<number, DetailStatistic>();
    selectedStatistic: DetailStatistic | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    get statistic(){
        return Array.from(this.statisticRegistry.values())
    }

    loadStatisticsForRoom = async (roomId: number) => {
        try{
            const detailedStatistics = await agent.Statistics.listByRoom(roomId);
            detailedStatistics.forEach(statistic => {
                this.setDetailStatistic(statistic);
            })
        } catch (error){
            console.log(error);
        }
    }

    loadSelectedStatistic = async (id: number) => {
        let detailStatistic = this.getDetailStatistic(id);
        if(detailStatistic){
            this.selectedStatistic = detailStatistic;
            return detailStatistic;
        } else {
            try{
                detailStatistic = await agent.Statistics.details(id);
                this.setDetailStatistic(detailStatistic);
                runInAction(() =>{
                    this.selectedStatistic = detailStatistic;
                })
                return detailStatistic;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getDetailStatistic = (id: number) => {
        return this.statisticRegistry.get(id);
    }

    private setDetailStatistic = (statistic: DetailStatistic) => {
        this.statisticRegistry.set(statistic.id, statistic);
    }
}