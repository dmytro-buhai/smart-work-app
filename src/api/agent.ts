import axios, { AxiosResponse } from "axios";
import { DetailStatistic } from "../models/detailStatistic";
import { Office } from "../models/office";
import { Statistic } from "../models/statistic";
import { SubscribeDetails } from "../models/subscribeDetails";

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
    countItems: 100
}

const Offices = {
    list: () => requests.get<Office[]>(`/Offices/List/${pageInfo.countItems}`),
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
    Offices,
    Rooms,
    Statistics,
    SubDetails
}

export default agent;