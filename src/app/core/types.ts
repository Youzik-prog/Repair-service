import { Observable } from "rxjs";

export const enum UserType {
    guest = "GUEST",
    user = "USER",
    worker = "WORKER", 
    admin = "ADMIN"
}

export type DeviceType = never;

export interface Row {
    id: number
}

export interface User extends Row {
    name: string,
    password: string,
    lastName?: string,
    email?: string,
    phone?: string,
    type: UserType
}

export interface Dealer extends Row {
    name: string,
    adress?: string,
    phone?: string,
    email?: string
}

export interface Detail extends Row {
    name: string,
    price?: number,
    dealerId?: number,
}

export interface DetailForOrder extends Row {
    detailId: number,
    orderId: number,
    amount: number
}

export interface Device extends Row {
    vendor: string,
    model?: string,
    year: number
    type: DeviceType
}

export interface Order extends Row {
    deviceId: number,
    workerId?: number,
    userId?: number,
    price?: number,
    startDate?: string,
    endDate?: string
}

export interface Worker extends Row {
    name: string,
    lastName?: string,
    phone?: string,
    email?: string,
    skillLevel?: number
}

export interface TableService<T> {
    getAllRecords(): Observable<T[]>;
    getRecordById(id: number): Observable<T | null>;
}

export type ColumnNames<T> = {
    [K in keyof T]: string;
}