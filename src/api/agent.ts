import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Company } from "../models/company";
import { DetailStatistic } from "../models/detailStatistic";
import { Office } from "../models/office";
import { PaginatedResult } from "../models/pagination";
import { Statistic } from "../models/statistic";
import { SubscribeDetails } from "../models/subscribeDetails";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            if(!(data as any).errors) {
                console.log((data as any).errors)
                const modalStateErrors = [];
                for (const key in (data as any).errors){
                    if((data as any).errors[key]) {
                        modalStateErrors.push((data as any).errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                store.commonStore.navigateToNotFoundPage();
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 404:
            store.commonStore.navigateToNotFoundPage();
            toast.error('not found');
            break;
        case 500:
            toast.error('server error')
            break;
    }

    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const pageInfo = {
    countItems: 100
}

const Account = {
    current: () => requests.get<User>('/auth/account'),
    login: (user: UserFormValues) => requests.post<User>('/auth/login', user),
    register: (user: UserFormValues) => requests.post<User>('/auth/register', user)
}

const Companies = {
    list: () => requests.post<Company[]>('/Companies/List', pageInfo),
    details: (id: number) => requests.get<Company>(`/Company/FindById/${id}`),
}

const Offices = {
    list: (params: URLSearchParams) => 
    axios.get<PaginatedResult<Office[]>>
        ('Offices/List', {params}).then(responseBody),
    details: (id: number) => requests.get<Office>(`/Office/FindById/${id}`),
    create: (office: Office) => requests.post<string>('Office/Add', office),
    update: (office: Office) => requests.put<string>('Office/Update', office),
    delete: (id: number) => requests.del<string>(`Office/Delete/${id}`),
}

const Rooms = {
    getRoomInfoById: (id: number) => requests.get<any>(`/Room/GetRoomInfoById/${id}`),
}

const Statistics = {
    list: () => requests.post<Statistic[]>(`/Statistics/List`, pageInfo),
    listByRoom: (roomId: number) => requests.get<DetailStatistic[]>(`/Statistic/GetByRoomId/${roomId}`),
    details: (id: number) => requests.get<DetailStatistic>(`/Statistic/FindById/${id}`),
    attendanceList: (roomId: number) => requests.get<Statistic[]>(`/AttendanceStatistic/List/${roomId}`)
}

const SubDetails = {
    listByRooms: (roomIDs: number[]) => requests.post<SubscribeDetails[]>(`/SubscribeDetails/GetListForRooms`, roomIDs),
}

const agent = {
    Account,
    Companies,
    Offices,
    Rooms,
    Statistics,
    SubDetails
}


export default agent;