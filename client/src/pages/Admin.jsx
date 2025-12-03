import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, MessageSquare, Users, Settings, LogOut } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Mock data
    const stats = {
        orders: 124,
        revenue: 15490.50,
        users: 850,
        queries: 12
    };

    const recentOrders = [
        { id: '#ORD-001', user: 'John Doe', total: 249.99, status: 'Processing', date: '2023-10-25' },
        { id: '#ORD-002', user: 'Jane Smith', total: 89.99, status: 'Shipped', date: '2023-10-24' },
        { id: '#ORD-003', user: 'Mike Johnson', total: 129.99, status: 'Delivered', date: '2023-10-23' },
    ];

    const queries = [
        { id: 1, name: 'Alice Brown', email: 'alice@example.com', message: 'When will the Retro Console X be back in stock?', date: '2 hrs ago' },
        { id: 2, name: 'Bob Wilson', email: 'bob@example.com', message: 'Do you ship internationally?', date: '5 hrs ago' },
    ];

    return (
        <div className="pt-20 min-h-screen flex bg-dark">
            {/* Sidebar */}
            <div className="w-64 bg-dark-lighter border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-display font-bold text-white">Admin Panel</h2>
                </div>
                <nav className="flex-grow px-4 space-y-2">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                        <ShoppingBag size={20} />
                        Orders
                    </button>
                    <button onClick={() => setActiveTab('queries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'queries' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                        <MessageSquare size={20} />
                        Queries
                    </button>
                    <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                        <Users size={20} />
                        Users
                    </button>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 overflow-y-auto">
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-dark-lighter p-6 rounded-xl border border-white/10">
                                <div className="text-gray-400 mb-2">Total Revenue</div>
                                <div className="text-3xl font-bold text-white">${stats.revenue.toLocaleString()}</div>
                            </div>
                            <div className="bg-dark-lighter p-6 rounded-xl border border-white/10">
                                <div className="text-gray-400 mb-2">Total Orders</div>
                                <div className="text-3xl font-bold text-white">{stats.orders}</div>
                            </div>
                            <div className="bg-dark-lighter p-6 rounded-xl border border-white/10">
                                <div className="text-gray-400 mb-2">Active Users</div>
                                <div className="text-3xl font-bold text-white">{stats.users}</div>
                            </div>
                            <div className="bg-dark-lighter p-6 rounded-xl border border-white/10">
                                <div className="text-gray-400 mb-2">Pending Queries</div>
                                <div className="text-3xl font-bold text-white">{stats.queries}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-dark-lighter rounded-xl border border-white/10 p-6">
                                <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
                                <div className="space-y-4">
                                    {recentOrders.map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-dark rounded-lg">
                                            <div>
                                                <div className="font-bold text-white">{order.id}</div>
                                                <div className="text-sm text-gray-400">{order.user}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-white">${order.total}</div>
                                                <div className={`text-sm ${order.status === 'Delivered' ? 'text-green-400' :
                                                        order.status === 'Shipped' ? 'text-blue-400' : 'text-yellow-400'
                                                    }`}>{order.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-dark-lighter rounded-xl border border-white/10 p-6">
                                <h3 className="text-xl font-bold mb-6">Recent Queries</h3>
                                <div className="space-y-4">
                                    {queries.map(query => (
                                        <div key={query.id} className="p-4 bg-dark rounded-lg">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-bold text-white">{query.name}</span>
                                                <span className="text-xs text-gray-500">{query.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-400 line-clamp-2">{query.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
