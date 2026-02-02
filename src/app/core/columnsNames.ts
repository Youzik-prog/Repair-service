import { ColumnNames, Dealer, Detail, DetailForOrder, Device, Order, User, Worker } from "./types";

const id = "Идентификатор";
const phone = "Номер телефона";
const email = "Электронная почта";

export const OrderColumnNames: ColumnNames<Order> = {
    id: id,
    deviceId: 'Идентификатор устройства',
    workerId: "Идентификатор работника",
    userId: "Идентификатор пользователя",
    price: "Стоимость ремонта",
    startDate: "Дата принятия в ремонт",
    endDate: "Дата окончания ремонта"
}

export const UserColumnNames: ColumnNames<User> = {
    id: id,
    name: "Имя",
    password: "Пароль",
    lastName: "Фамилия",
    email: email,
    phone: phone,
    type: "Тип пользователя"
}

export const DealerColumnNames: ColumnNames<Dealer> = {
    id: id,
    name: "Название организации",
    adress: "Адрес",
    phone: phone,
    email: email
}

export const DetailColumnNames: ColumnNames<Detail> = {
    id: id,
    name: "Название детали",
    price: "Цена",
    dealerId: "Идентификтор поставщика",
}

export const DetailForOrderColumnNames: ColumnNames<DetailForOrder> = {
    id: id,
    detailId: "Идентификатор детали",
    orderId: "Идентификатор заказа",
    amount: "Количество"
}

export const DeviceColumnNames: ColumnNames<Device> = {
    id: id,
    vendor: "Производитель",
    model: "Модель",
    year: "Год производства",
    type: "Тип устройства"
}

export const WorkerColumnNames: ColumnNames<Worker> = {
    id: id,
    name: "Имя",
    lastName: "Фамилия",
    phone: phone,
    email: email,
    skillLevel: "Профессиональный разряд"
}