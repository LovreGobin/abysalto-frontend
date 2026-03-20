import { useEffect, useState } from 'react'
import { getOrders } from '../services/api'
import type { Order } from '../types/order'

interface Props {
    onSelectOrder: (order: Order) => void
}

function OrderList({ onSelectOrder }: Props) {
    const [orders, setOrders] = useState<Order[]>([])
    const [sortByAmount, setSortByAmount] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [sortByAmount])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await getOrders(sortByAmount)
            setOrders(response.data)
        } catch (error) {
            console.error('Failed to fetch orders', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="order-list">
            <div className="order-list-header">
                <h2>Orders</h2>
                <button onClick={() => setSortByAmount(!sortByAmount)}>
                    {sortByAmount ? 'Sort: Amount ↑' : 'Sort: Default'}
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Total</th>
                            <th>Currency</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.status}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.totalAmount}</td>
                                <td>{order.currency}</td>
                                <td>{new Date(order.orderTime).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => onSelectOrder(order)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OrderList