import axios from 'axios'
import type { CreateOrderDto, OrderStatus } from '../types/order'

const BASE_URL = 'http://localhost:5074/api/Restaurant'

export const getOrders = (sortByAmount = false) =>
    axios.get(`${BASE_URL}?sortByAmount=${sortByAmount}`)

export const getOrderById = (id: number) =>
    axios.get(`${BASE_URL}/${id}`)

export const createOrder = (order: CreateOrderDto) =>
    axios.post(BASE_URL, order)

export const updateOrderStatus = (id: number, status: OrderStatus) =>
    axios.put(`${BASE_URL}/${id}/status?status=${status}`)

export const getOrderTotal = (id: number) =>
    axios.get(`${BASE_URL}/${id}/total`)