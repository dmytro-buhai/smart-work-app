import { useContext, createContext } from "react";
import CommonStore from "./commonStore";
import CompanyStore from "./companyStore";
import ModalStore from "./modalStore";
import OfficeStore from "./officeStore";
import StatisticStore from "./statisticStore";
import SubscribeStore from "./subscribeStore";
import UserStore from "./userStore";

interface Store {
    officeStore: OfficeStore
    statisticStore: StatisticStore
    userStore: UserStore
    commonStore: CommonStore
    modalStore: ModalStore
    subscribeStore: SubscribeStore
    companyStore: CompanyStore
}

export const store: Store = {
    officeStore: new OfficeStore(),
    statisticStore: new StatisticStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    subscribeStore: new SubscribeStore(),
    companyStore: new CompanyStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}