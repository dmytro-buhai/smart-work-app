import { useContext, createContext } from "react";
import OfficeStore from "./officeStore";

interface Store {
    officeStore: OfficeStore
}

export const store: Store = {
    officeStore: new OfficeStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}