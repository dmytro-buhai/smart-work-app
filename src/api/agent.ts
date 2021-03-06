import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Company } from "../models/company";
import { DetailStatistic } from "../models/detailStatistic";
import { InfoUserSubscribe } from "../models/infoUserSubscribe";
import { Office } from "../models/office";
import { OrderSubscribe } from "../models/orderSubscribe";
import { PaginatedResult } from "../models/pagination";
import { Profile } from "../models/profile";
import { Room } from "../models/room";
import { Statistic } from "../models/statistic";
import { SubscribeDetail } from "../models/SubscribeDetail";
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
        response.data = new PaginatedResult(response.data, 
            JSON.parse(pagination));
        return response as 
            AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string'){
                toast.error((data as string))
            }
            if(config.method === 'get' && (data as any)
                .errors.hasOwnProperty('id')) {
                store.commonStore.navigateToNotFoundPage();
            }
            if((data as any).errors) {
                console.log((data as any).errors)
                const modalStateErrors = [];
                for (const key in (data as any).errors){
                    if((data as any).errors[key]) {
                        modalStateErrors.push((data as any)
                            .errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 404:
            store.commonStore.navigateToNotFoundPage();
            break;
        case 500:
            store.commonStore.setServerError((data as any));
            store.commonStore.navigateToServerErrorPage();
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T> (url: string) => axios
        .get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios
        .post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios
        .put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios
        .delete<T>(url).then(responseBody),
}

const pageInfo = {
    countItems: 100
}

const Account = {
    current: () => requests.get<User>('/auth/account'),
    login: (user: UserFormValues) => requests.post<User>('/auth/login', user),
    register: (user: UserFormValues) => requests.post<User>('/auth/register', user),
    update: (user: User) => requests.put<string>('user/update', user)
}

const Companies = {
    fullList: () => requests.post<Company[]>('/Companies/FullList', pageInfo),
    list: (params: URLSearchParams) => 
    axios.get<PaginatedResult<Company[]>>
        ('Companies/List', {params}).then(responseBody),
    details: (id: number) => requests.get<Company>(`/Company/FindById/${id}`),
    create: (company: Company) => requests.post<string>('Company/Add', company),
    update: (company: Company) => requests.put<string>('Company/Update', company),
    delete: (id: number) => requests.del<string>(`Company/Delete/${id}`),
}

const Offices = {
    list: (params: URLSearchParams) => 
    axios.get<PaginatedResult<Office[]>>
        ('Offices/List', {params}).then(responseBody),
    fullList: () => requests.post<Office[]>('/Office/FullList', pageInfo),
    details: (id: number) => requests.get<Office>(`/Office/FindById/${id}`),
    create: (office: Office) => requests.post<string>('Office/Add', office),
    update: (office: Office) => requests.put<string>('Office/Update', office),
    delete: (id: number) => requests.del<string>(`Office/Delete/${id}`),
}

const Rooms = {
    getRoomInfoById: (id: number) => requests.get<Room>(`/Room/GetRoomInfoById/${id}`),
    create: (room: Room) => requests.post<Room>('Room/Add', room),
    update: (room: Room) => requests.put<string>('Room/Update', room),
    delete: (id: number) => requests.del<string>(`Room/Delete/${id}`),
}

const Statistics = {
    list: () => requests.post<Statistic[]>(`/Statistics/List`, pageInfo),
    listByRoom: (roomId: number) => requests.get<DetailStatistic[]>(`/Statistic/GetByRoomId/${roomId}`),
    details: (id: number) => requests.get<DetailStatistic>(`/Statistic/FindById/${id}`),
    attendanceList: (roomId: number) => requests.get<Statistic[]>(`/AttendanceStatistic/List/${roomId}`)
}

const Subscribe = {
    loadUserSubscribes: (username: string) => 
        requests.get<InfoUserSubscribe[]>(`/Subscribes/GetByUser/${username}`),
    orderUserSubscribe: (orderSubscribe: OrderSubscribe) => 
        requests.post<InfoUserSubscribe>(`/Subscribe/OrderUserSubscribe`, orderSubscribe),
}

const SubDetails = {
    listByRooms: (roomIDs: number[]) => requests.post<SubscribeDetail[]>(`/SubscribeDetails/GetListForRooms`, roomIDs),
    listByRoomId: (roomId: number) => requests.get<SubscribeDetail[]>(`/SubscribeDetails/GetByRoomId/${roomId}`),
}

const agent = {
    Account,
    Companies,
    Offices,
    Rooms,
    Statistics,
    SubDetails,
    Subscribe
}


export default agent;