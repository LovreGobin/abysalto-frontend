import { useState } from 'react'
import { createOrder } from '../services/api'
import { PaymentMethod } from '../types/order'
import type { CreateOrderDto, CreateOrderItem } from '../types/order'

interface Props {
    onOrderCreated: () => void
}

function CreateOrder({ onOrderCreated }: Props) {
    const [form, setForm] = useState<CreateOrderDto>({
        customerName: '',
        paymentMethod: PaymentMethod.Cash,
        deliveryAddress: '',
        contactNumber: '',
        note: '',
        currency: 'EUR',
        items: [{ name: '', quantity: 1, price: 0 }]
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleItemChange = (index: number, field: keyof CreateOrderItem, value: string | number) => {
        const updatedItems = [...form.items]
        updatedItems[index] = { ...updatedItems[index], [field]: value }
        setForm({ ...form, items: updatedItems })
    }

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { name: '', quantity: 1, price: 0 }] })
    }

    const removeItem = (index: number) => {
        const updatedItems = form.items.filter((_, i) => i !== index)
        setForm({ ...form, items: updatedItems })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(null)
            await createOrder(form)
            onOrderCreated()
            setForm({
                customerName: '',
                paymentMethod: PaymentMethod.Cash,
                deliveryAddress: '',
                contactNumber: '',
                note: '',
                currency: 'EUR',
                items: [{ name: '', quantity: 1, price: 0 }]
            })
        } catch (err) {
            setError('Failed to create order. Please check your inputs.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="create-order">
            <h2>Create New Order</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer Name</label>
                    <input name="customerName" value={form.customerName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Payment Method</label>
                    <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                        {Object.values(PaymentMethod).map(pm => (
                            <option key={pm} value={pm}>{pm}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Delivery Address</label>
                    <input name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Note</label>
                    <textarea name="note" value={form.note} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Currency</label>
                    <input name="currency" value={form.currency} onChange={handleChange} />
                </div>

                <h3>Items</h3>
                {form.items.map((item, index) => (
                    <div key={index} className="item-row">
                        <div className="item-field">
                            <label>Item name</label>
                            <input
                                placeholder="Item name"
                                value={item.name}
                                onChange={e => handleItemChange(index, 'name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="item-field">
                            <label>Quantity</label>
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={e => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                min={1}
                                required
                            />
                        </div>
                        <div className="item-field">
                            <label>Price</label>
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={e => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                min={0.01}
                                step={0.01}
                                required
                            />
                        </div>
                        {form.items.length > 1 && (
                            <button type="button" className="btn-remove" onClick={() => removeItem(index)}>Remove</button>
                        )}
                    </div>
                ))}

                <div className="actions">
                    <button type="button" className="btn-add" onClick={addItem}>+ Add Item</button>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Order'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateOrder