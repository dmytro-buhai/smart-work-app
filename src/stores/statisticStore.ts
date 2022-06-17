import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { DetailStatistic } from "../models/detailStatistic";

export default class StatisticStore {
    statisticRegistry = new Map<number, DetailStatistic>();
    selectedStatistic: DetailStatistic[] | undefined = undefined;
    selectedRoomId: number | undefined;
    loadingInitial = true;
    loading = false;
    selectedStatisticType: string = "Attendance";

    constructor() {
        makeAutoObservable(this)
    }

    get currentSelectedStatistic() {
        return this.selectedStatistic;
    }

    get groupedCurrentSelectedStatistic() {
        return Object.entries(
            this.currentSelectedStatistic!.reduce((statistics, statistic) => {
                const type = statistic.type;
                statistics[type] = statistics[type] ? [...statistics[type], statistic] : [statistic];
                return statistics;
            }, {} as {[key: string]: DetailStatistic[]})
        )
    }

    get statistics(){
        return Array.from(this.statisticRegistry.values())
    }

    loadStatisticsForRoom = async (roomId: number) => {
        this.setLoading(true);
        this.setSelectedStatisticDetails(undefined);

        let data = this.statistics.filter(s => s.roomId === roomId)

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

    setSelectedStatisticType = (state: string) => {
        this.selectedStatisticType  = state;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setSelectedStatisticDetails = (statisticDetals: DetailStatistic[] | undefined) => {
        this.selectedStatistic = statisticDetals;
    }

    setSelectedRoomId = (roomId: number | undefined) => {
        this.selectedRoomId = roomId
    }

    private setDetailStatistic = (statistic: DetailStatistic) => {
        let dates = statistic.dates
        for(let i = 0; i < statistic.dates.length; i++){
            dates[i] = new Date(statistic.dates[i])
        }
        this.statisticRegistry.set(statistic.id, statistic);
    }
}