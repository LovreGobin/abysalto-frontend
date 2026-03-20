import { useState } from 'react'
import OrderList from './components/OrderList'
import CreateOrder from './components/CreateOrder'
import UpdateStatus from './components/UpdateStatus'
import type { Order } from './types/order'
import './App.css'

type View = 'list' | 'create' | 'update'

function App() {
    const [view, setView] = useState<View>('list')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    const handleOrderCreated = () => {
        setRefreshKey(prev => prev + 1)
        setView('list')
    }

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order)
        setView('update')
    }

    const handleStatusUpdated = () => {
        setRefreshKey(prev => prev + 1)
    }

    return (
        <div className="app">
            <header>
                <h1>🍕 Restaurant Orders</h1>
                <nav>
                    <button onClick={() => setView('list')}>Orders</button>
                    <button onClick={() => setView('create')}>+ New Order</button>
                </nav>
            </header>

            <main>
                {view === 'list' && (
                    <OrderList
                        key={refreshKey}
                        onSelectOrder={handleSelectOrder}
                    />
                )}
                {view === 'create' && (
                    <CreateOrder onOrderCreated={handleOrderCreated} />
                )}
                {view === 'update' && selectedOrder && (
                    <UpdateStatus
                        order={selectedOrder}
                        onStatusUpdated={handleStatusUpdated}
                        onClose={() => setView('list')}
                    />
                )}
            </main>
        </div>
    )
}

export default App