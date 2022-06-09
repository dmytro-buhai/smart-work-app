import { useContext, createContext } from "react";
import OfficeStore from "./officeStore";
import StatisticStore from "./statisticStore";

interface Store {
    officeStore: OfficeStore
    statisticStore: StatisticStore
}

export const store: Store = {
    officeStore: new OfficeStore(),
    statisticStore: new StatisticStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}