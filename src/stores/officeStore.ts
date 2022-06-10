import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Company } from "../models/company";
import { CompanyOptions } from "../models/companyOptions";
import { Office } from "../models/office";

export default class OfficeStore {
    companyRegistry = new Map<number, Company>();
    officeRegistry = new Map<number, Office>();
    selectedOffice: Office | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    isAddedNewOffice = false;
    errorResult: any | undefined;

    constructor() {
        makeAutoObservable(this)
    }

    get companies() {
        return Array.from(this.companyRegistry.values()).sort((a, b) => a.id - b.id);
    }

    get companiesOptions() {
        return this.getCompaniesOptions();
    }

    get officesById() {
        return Array.from(this.officeRegistry.values()).sort((a, b) => a.id - b.id);
    }

    get officesByCompany() {
        return Array.from(this.officeRegistry.values()).sort((a, b) => a.companyId - b.companyId);
    }

    get groupedOffices() {
        return Object.entries(
            this.officesByCompany.reduce((offices, office) => {
                const companyName = office.company.name
                offices[companyName] = offices[companyName] ? [...offices[companyName], office] : [office];
                return offices;
            }, {} as {[key: string]: Office[]})
        )
    }

    setIsAddedNewOffice = (value: boolean) => {
        this.isAddedNewOffice = value;
    }

    loadOffices = async () => {
        this.loadingInitial = true;
        try{
            const offices = await agent.Offices.list();
            offices.forEach(office => {
                this.setOffice(office);
                this.setCompany(office.company);
            })
            this.setLoadingInitial(false);
        } catch (error: any){
            console.log(error.response.data);
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
            } catch (error: any) {
                this.setError(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setOffice = (office: Office) => {
        this.officeRegistry.set(office.id, office);
    }

    private setCompany = (company: Company) => {
        this.companyRegistry.set(company.id, company);
    }

    private getOffice = (id: number) => {
        return this.officeRegistry.get(id);
    }

    getCompaniesOptions = async () => {
       this.setLoadingInitial(true);

        let companyOptions = new Array<CompanyOptions>()
        try{
            let companies = await agent.Companies.list()

            console.log('convertOfficesToOptions')
            console.log(this.companies)
         
            companies.forEach(company => {
                this.setCompany(company);
            })
            
            companies.forEach(company => {
                let option: CompanyOptions = {
                    text: company.name,
                    value: company.id   
                }
                companyOptions.push(option)
            })
            this.setLoadingInitial(false);
            return companyOptions;
        } catch (error){
            console.log(error)
            this.setLoadingInitial(false);
        }  
    }

    setError = (error: any | undefined) => {
        this.errorResult = error
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createOffice = async (office: Office) => {
        this.loading = true;
        try{
            let id = await agent.Offices.create(office);
            office.company = await agent.Companies.details(office.companyId);
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
            office.company = await agent.Companies.details(office.companyId);
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