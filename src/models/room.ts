import { Statistic } from "./statistic";
import { SubscribeDetail } from "./SubscribeDetail";

export interface Room {
    id: number;
    officeId: number;
    name: string;
    number: string;
    square: number;
    amountOfWorkplaces: number;
    photoFileName: string;
    equipment?: any;
    statistics?: Statistic[];
    subscribeDetails: SubscribeDetail[];
    host: string;
    subscribeForDay?: number;
    subscribeForWeek?: number;
    subscribeForMonth?: number;
}