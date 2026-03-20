export const OrderStatus = {
    Pending: 'Pending',
    InPreparation: 'InPreparation',
    Completed: 'Completed'
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

export const PaymentMethod = {
    Cash: 'Cash',
    Card: 'Card',
    Online: 'Online'
} as const

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod]

export interface OrderItem {
    name: string
    quantity: number
    price: number
}

export interface Order {
    id: number
    customerName: string
    status: OrderStatus
    orderTime: string
    paymentMethod: PaymentMethod
    deliveryAddress: string
    contactNumber: string
    note?: string
    currency: string
    totalAmount: number
    items: OrderItem[]
}

export interface CreateOrderItem {
    name: string
    quantity: number
    price: number
}

export interface CreateOrderDto {
    customerName: string
    paymentMethod: PaymentMethod
    deliveryAddress: string
    contactNumber: string
    note?: string
    currency: string
    items: CreateOrderItem[]
}