import { Validators } from "@angular/forms";
import { ColumnConfig, Dealer, Detail, DetailForOrder, Device, Order, TableService, User, UserType, Worker } from "./types";
import { UsersService } from "../services/users.service";

const positiveInt = /^\d{1,9}$/;
const money = /^\d+([.,]\d{1,2})?$/;
const year = /^\d{1,4}$/;
const phone = /^\+\d+$/;

const ID_COL: ColumnConfig = { label: 'ID', type: 'id' };
const PHONE_COL: ColumnConfig = { label: 'Телефон', type: 'tel', validators: [Validators.pattern(phone), Validators.maxLength(20)] };
const EMAIL_COL: ColumnConfig = { label: 'Email', type: 'email', validators: [Validators.email, Validators.maxLength(25)] };

export const ORDERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    deviceId: { label: 'Идентификатор устройства', type: 'number', validators: [Validators.required, Validators.pattern(positiveInt)] },
    workerId: { label: 'Идентификатор работника', type: 'number', validators: Validators.pattern(positiveInt) },
    userId: { label: 'Идентификатор пользователя', type: 'number', validators: Validators.pattern(positiveInt) },
    price: { label: 'Стоимость ремонта', type: 'number', validators: Validators.pattern(money)},
    startDate: { label: 'Дата принятия в ремонт', type: 'date', },
    endDate: { label: 'Дата окончания ремонта', type: 'date' }
};

export const USERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Имя', type: 'text', validators: [Validators.required, Validators.maxLength(20)] },
    lastName: { label: 'Фамилия', type: 'text', validators: Validators.maxLength(30) },
    password: { label: 'Пароль', type: 'password', validators: [Validators.required, Validators.minLength(4), Validators.maxLength(30)] },
    email: EMAIL_COL,
    phone: PHONE_COL,
    type: { 
        label: 'Тип пользователя', 
        type: 'select',
        options: [
            { label: 'Клиент', value: UserType.guest },
            { label: "Пользователь", value: UserType.user },
            { label: 'Работник', value: UserType.worker },
            { label: 'Админ', value: UserType.admin },
        ]
    },
    userUuid: {label: "Уникальный идентификатор", type: 'uuid'}
};

export const DEALERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Название организации', type: 'text', validators: [Validators.required, Validators.maxLength(100)] },
    adress: { label: 'Адрес', type: 'text', validators: Validators.maxLength(100) },
    phone: PHONE_COL,
    email: EMAIL_COL
};

export const DETAILS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Название детали', type: 'text', validators: [Validators.required, Validators.maxLength(100)] },
    price: { label: 'Цена', type: 'number', validators: Validators.pattern(money) },
    dealerId: { label: 'Идентификатор поставщика', type: 'number', validators: Validators.pattern(positiveInt) }
};

export const DETAILS_FOR_ORDER_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    detailId: { label: 'Идентификатор детали', type: 'number', validators: [Validators.required, Validators.pattern(positiveInt)]},
    orderId: { label: 'Идентификатор заказа', type: 'number', validators: [Validators.required, Validators.pattern(positiveInt)] },
    amount: { label: 'Количество', type: 'number', validators: Validators.pattern(positiveInt) }
};

export const DEVICES_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    vendor: { label: 'Производитель', type: 'text', validators: [Validators.required, Validators.maxLength(50)] },
    model: { label: 'Модель', type: 'text', validators: Validators.maxLength(100) },
    year: { label: 'Год производства', type: 'number', validators: Validators.pattern(year)},
    deviceTypeId: { label: 'Тип устройства', type: 'text' }
};

export const DEVICES_TYPES_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Название', type: 'text', validators: [Validators.required, Validators.maxLength(50)]}
}

export const WORKERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Имя', type: 'text', validators: [Validators.required, Validators.maxLength(20)] },
    lastName: { label: 'Фамилия', type: 'text', validators: [Validators.required, Validators.maxLength(30)] },
    phone: PHONE_COL,
    email: EMAIL_COL,
    skillLevel: { label: 'Профессиональный разряд', type: 'number', validators: Validators.pattern(positiveInt) }
};