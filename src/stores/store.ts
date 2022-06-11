import { useContext, createContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import OfficeStore from "./officeStore";
import StatisticStore from "./statisticStore";
import UserStore from "./userStore";

interface Store {
    officeStore: OfficeStore
    statisticStore: StatisticStore
    userStore: UserStore
    commonStore: CommonStore
    modalStore: ModalStore
}

export const store: Store = {
    officeStore: new OfficeStore(),
    statisticStore: new StatisticStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}