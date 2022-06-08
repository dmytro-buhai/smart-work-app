import axios, { AxiosResponse } from "axios";
import { Office } from "../models/office";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const pageInfo = {
    countItems: 10
}

const Offices = {
    list: () => requests.get<Office[]>(`/Offices/List/${pageInfo.countItems}`),
    details: (id: number) => requests.get<Office>(`/Office/FindById/${id}`),
    create: (office: Office) => requests.post<string>('Office/Add', office),
    update: (office: Office) => requests.put<string>('Office/Update', office),
    delete: (id: number) => requests.del<string>(`Office/Delete/${id}`),
}

const agent = {
    Offices
}

export default agent;