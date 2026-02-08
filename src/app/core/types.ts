import { AbstractControl, AsyncValidatorFn, Validator, ValidatorFn } from "@angular/forms";
import { Observable, Subject } from "rxjs";

export const enum UserType {
    guest = "guest",
    user = "user",
    worker = "worker", 
    admin = "admin"
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
    type: UserType,
    userUuid: string,
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
    dealerId?: number | string,
}

export interface DetailForOrder extends Row {
    detailId: number | string,
    orderId: number | string,
    amount: number
}

export interface Device extends Row {
    vendor: string,
    model?: string,
    year?: number
    deviceTypeId?: Number
}

export interface Devices_types extends Row {
    name: string
}

export interface Order extends Row {
    deviceId: number | string,
    workerId?: number | string,
    userId?: number | string,
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
    tableName: string,
    tableChanges$: Subject<void>,
    getAllRecords(transformation: {
    sortBy?: ColumnNames<T>,
    sortAscending?: boolean,
    filterBy?: ColumnNames<T>,
    filterFunction?: (el: T) => boolean
  }): Observable<T[]>;
    getRecordById(id: number): Observable<T | null>;
    getRecordsByColumn(column: ColumnNames<T>, value: string): Observable<T[]>;
    updateRecord(id: number, record: T): void;
    createRecord(record: T): void,
    deleteRecord(id: number): void
}

export type ColumnNames<T> = Extract<keyof T, string>;


export type ColumnType = 'id' | 'uuid' | 'text' | 'number' | 'email' | 'tel' | 'password' | 'date' | 'select';

export interface ColumnConfig {
    label: string,
    type: ColumnType,
    validators?: ValidatorFn | ValidatorFn[],
    options?: {label: string, value: any}[];
}