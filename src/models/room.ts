import { Statistic } from "./statistic";

export interface Room {
    id: number;
    officeId: number;
    name: string;
    number: string;
    square: number;
    amountOfWorkplaces: number;
    photoFileName: string;
    equipment?: any;
    statistics: Statistic[];
    subscribeDetails?: any;
}