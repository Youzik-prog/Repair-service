const enum UserType {
    guest = "GUEST",
    user = "USER",
    worker = "WORKER", 
    admin = "ADMIN"
}

interface Table {
    id: number
}

interface UsersTable extends Table {
    name: string,
    password: string,
    lastName?: string,
    email?: string,
    phone?: string,
    type: UserType
}

interface DealersTable extends Table {
    name: string,
    adress?: string,
    phone?: string,
    email?: string
}

interface DetailsTable extends Table {
    name: string,
    price?: number,
    dealerId?: number,
}

interface DetailsForOrderTable extends Table {
    detailId: number,
    orderId: number,
    amount: number
}

interface DevicesTable extends Table {
    vendor: string,
    model?: string,
    year: number
    type: any /* TODO */
}

interface OrdersTable extends Table {
    deviceId: number,
    workerId?: number,
    userId?: number,
    price?: number,
    startDate?: Date,
    endDate?: Date
}

interface WorkersTable extends Table {
    name: string,
    lastName?: string,
    phone?: string,
    email?: string,
    skillLevel?: number
}