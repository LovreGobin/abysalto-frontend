import { useState } from 'react'
import { updateOrderStatus } from '../services/api'
import { OrderStatus } from '../types/order'
import type { Order } from '../types/order'

interface Props {
    order: Order
    onStatusUpdated: () => void
    onClose: () => void
}

function UpdateStatus({ order, onStatusUpdated, onClose }: Props) {
    const [status, setStatus] = useState<string>(order.status)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleUpdate = async () => {
        try {
            setLoading(true)
            setError(null)
            await updateOrderStatus(order.id, status as typeof OrderStatus[keyof typeof OrderStatus])
            onStatusUpdated()
            onClose()
        } catch (err) {
            setError('Failed to update status.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="update-status">
            <h2>Order #{order.id} — {order.customerName}</h2>

            <div className="order-details">
                <p><strong>Address:</strong> {order.deliveryAddress}</p>
                <p><strong>Contact:</strong> {order.contactNumber}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Currency:</strong> {order.currency}</p>
                {order.note && <p><strong>Note:</strong> {order.note}</p>}
                <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>
            </div>

            <h3>Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price} {order.currency}</td>
                            <td>{(item.price * item.quantity).toFixed(2)} {order.currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p><strong>Total: {order.totalAmount.toFixed(2)} {order.currency}</strong></p>

            <div className="form-group">
                <label>Update Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    {Object.values(OrderStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="button-row">
                <button onClick={handleUpdate} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Status'}
                </button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default UpdateStatus