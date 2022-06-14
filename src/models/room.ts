import { Statistic } from "./statistic";
import { SubscribeDetails } from "./subscribeDetails";

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
    subscribeDetails?: SubscribeDetails[];
    host: string;
}