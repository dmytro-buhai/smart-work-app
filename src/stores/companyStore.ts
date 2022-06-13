import { makeAutoObservable, reaction, runInAction } from "mobx"
import agent from "../api/agent";
import { Company } from "../models/company";
import { Pagination, PagingParams } from "../models/pagination";

export default class CompanyStore {
    companyRegistry = new Map<number, Company>();
    selectedCompany: Company | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    isAddedNewCompany = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.companyRegistry.clear();
                console.log(this.companyRegistry);
                this.loadCompanies();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    get companies() {
        return Array.from(this.companyRegistry.values()).sort((a, b) => a.id - b.id);
    }

    get companiesById() {
        return Array.from(this.companyRegistry.values()).sort((a, b) => a.id - b.id);
    }

    loadCompanies = async () => {
        this.loadingInitial = true;
        try{
            const result = await agent.Companies.list(this.axiosParams);
            result.data.forEach(company => {
                this.setCompany(company);
            })
            this.setPagination(result.pagination)
            this.setLoadingInitial(false);
        } catch (error: any){
            console.log(error.response.data);
            this.setLoadingInitial(false);
        }
    }

    setIsAddedNewCompany = (value: boolean) => {
        this.isAddedNewCompany = value;
    }

    loadCompany = async (id: number) => {
        let company = this.getCompany(id);
        if(company){
            this.selectedCompany = company;
            return company;
        } else {
            this.loadingInitial = true;
            try{
                company = await agent.Companies.details(id);
                this.setCompany(company);
                runInAction(() =>{
                    this.selectedCompany = company;
                })
                this.setLoadingInitial(false);
                return company;
            } catch (error: any) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    private setCompany = (company: Company) => {
        this.companyRegistry.set(company.id, company);
    }

    private getCompany = (id: number) => {
        return this.companyRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCompany = async (company: Company) => {
        this.loading = true;
        try{
            let id = await agent.Companies.create(company);
            runInAction(() => {
                company.id = +id;
                this.companyRegistry.set(company.id, company);
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

    updateCompany = async (company: Company) => {
        this.loading = true;
        try{
            await agent.Companies.update(company);
            runInAction(() => {
                this.companyRegistry.set(company.id, company);
                this.selectedCompany = company;
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

    deleteCompany = async (id: number) => {
        this.loading = true;
        try{
            await agent.Companies.delete(id);
            runInAction(() => {
                this.companyRegistry.delete(id);
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