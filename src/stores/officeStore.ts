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
        this.loadingInitial = true;
        try{
            const offices = await agent.Offices.list();
            offices.forEach(office => {
                this.setOffice(office);
            })
            this.setLoadingInitial(false);
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadOffice = async (id: number) => {
        let office = this.getOffice(id);
        if(office){
            this.selectedOffice = office;
            return office;
        } else {
            this.loadingInitial = true;
            try{
                office = await agent.Offices.details(id);
                this.setOffice(office);
                runInAction(() =>{
                    this.selectedOffice = office;
                })
                this.setLoadingInitial(false);
                return office;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setOffice = (office: Office) => {
        this.officeRegistry.set(office.id, office);
    }

    private getOffice = (id: number) => {
        return this.officeRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createOffice = async (office: Office) => {
        this.loading = true;
        try{
            let id = await agent.Offices.create(office);
            runInAction(() => {
                office.id = +id;
                this.officeRegistry.set(office.id, office);
                this.selectedOffice = office;
                this.editMode = false;
                this.loading = false;
            })
            return +id;
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