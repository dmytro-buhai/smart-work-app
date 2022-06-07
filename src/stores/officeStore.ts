import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Office } from "../models/office";

export default class OfficeStore {
    officeRegistry = new Map<number, Office>();
    selectedOffice: Office | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get officesById() {
        return Array.from(this.officeRegistry.values()).sort((a, b) => a.id - b.id);
    }

    loadOffices = async () => {
        try{
            const offices = await agent.Offices.list();
            offices.forEach(office => {
                this.officeRegistry.set(office.id, office);
            })
            this.setLoadingInitial(false);
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectOffice = (id: number) => {
        this.selectedOffice = this.officeRegistry.get(id);
    }

    cancelSelectedOffice = () => {
        this.selectedOffice = undefined;
    }

    openForm = (id?: number) => {
        id? this.selectOffice(id) : this.cancelSelectedOffice();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createOffice = async (office: Office) => {
        this.loading = true;
        try{
            await agent.Offices.create(office);
            runInAction(() => {
                this.officeRegistry.set(office.id, office);
                this.selectedOffice = office;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateOffice = async (office: Office) => {
        this.loading = true;
        try{
            await agent.Offices.update(office);
            runInAction(() => {
                this.officeRegistry.set(office.id, office);
                this.selectedOffice = office;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteOffice = async (id: number) => {
        this.loading = true;
        try{
            await agent.Offices.delete(id);
            runInAction(() => {
                this.officeRegistry.delete(id);
                if(this.selectedOffice?.id === id) {
                    this.cancelSelectedOffice();
                }
                this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}