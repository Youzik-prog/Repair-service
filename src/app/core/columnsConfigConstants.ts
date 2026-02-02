import { ColumnConfig, ColumnNames, Dealer, Detail, DetailForOrder, Device, Order, User, UserType, Worker } from "./types";

const ID_COL: ColumnConfig = { label: 'ID', type: 'number' };
const PHONE_COL: ColumnConfig = { label: 'Телефон', type: 'tel' };
const EMAIL_COL: ColumnConfig = { label: 'Email', type: 'email' };

export const ORDERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    deviceId: { label: 'Идентификатор устройства', type: 'number' },
    workerId: { label: 'Идентификатор работника', type: 'number' },
    userId: { label: 'Идентификатор пользователя', type: 'number' },
    price: { label: 'Стоимость ремонта', type: 'number' },
    startDate: { label: 'Дата принятия в ремонт', type: 'date' },
    endDate: { label: 'Дата окончания ремонта', type: 'date' }
};

export const USERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Имя', type: 'text' },
    lastName: { label: 'Фамилия', type: 'text' },
    password: { label: 'Пароль', type: 'password' },
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
    }
};

export const DEALERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Название организации', type: 'text' },
    adress: { label: 'Адрес', type: 'text' },
    phone: PHONE_COL,
    email: EMAIL_COL
};

export const DETAILS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Название детали', type: 'text' },
    price: { label: 'Цена', type: 'number' },
    dealerId: { label: 'Идентификатор поставщика', type: 'number' }
};

export const DETAILS_FOR_ORDER_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    detailId: { label: 'Идентификатор детали', type: 'number' },
    orderId: { label: 'Идентификатор заказа', type: 'number' },
    amount: { label: 'Количество', type: 'number' }
};

export const DEVICES_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    vendor: { label: 'Производитель', type: 'text' },
    model: { label: 'Модель', type: 'text' },
    year: { label: 'Год производства', type: 'number' },
    type: { label: 'Тип устройства', type: 'text' } // Можно заменить на select
};

export const WORKERS_CONFIG: Record<string, ColumnConfig> = {
    id: ID_COL,
    name: { label: 'Имя', type: 'text' },
    lastName: { label: 'Фамилия', type: 'text' },
    phone: PHONE_COL,
    email: EMAIL_COL,
    skillLevel: { label: 'Профессиональный разряд', type: 'number' }
};