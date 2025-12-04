import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { isDark } = useTheme();

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
        <div className="pt-20 min-h-screen flex" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f1f5f9' }}>
            {/* Sidebar */}
            <div className="w-64 hidden md:flex flex-col" style={{ 
                backgroundColor: isDark ? '#12121a' : '#ffffff',
                borderRight: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
            }}>
                <div className="p-6">
                    <h2 className="text-xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Admin Panel</h2>
                </div>
                <nav className="flex-grow px-4 space-y-2">
                    <button onClick={() => setActiveTab('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{
                        backgroundColor: activeTab === 'dashboard' ? '#a855f7' : 'transparent',
                        color: activeTab === 'dashboard' ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                    }}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    <button onClick={() => setActiveTab('orders')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{
                        backgroundColor: activeTab === 'orders' ? '#a855f7' : 'transparent',
                        color: activeTab === 'orders' ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                    }}>
                        <ShoppingBag size={20} />
                        Orders
                    </button>
                    <button onClick={() => setActiveTab('queries')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{
                        backgroundColor: activeTab === 'queries' ? '#a855f7' : 'transparent',
                        color: activeTab === 'queries' ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                    }}>
                        <MessageSquare size={20} />
                        Queries
                    </button>
                    <button onClick={() => setActiveTab('users')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{
                        backgroundColor: activeTab === 'users' ? '#a855f7' : 'transparent',
                        color: activeTab === 'users' ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                    }}>
                        <Users size={20} />
                        Users
                    </button>
                </nav>
                <div className="p-4" style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{ color: '#ef4444' }}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 overflow-y-auto">
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <h1 className="text-3xl font-bold mb-8" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Dashboard Overview</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 rounded-xl" style={{ 
                                backgroundColor: isDark ? '#12121a' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
                            }}>
                                <div style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="mb-2">Total Revenue</div>
                                <div className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>${stats.revenue.toLocaleString()}</div>
                            </div>
                            <div className="p-6 rounded-xl" style={{ 
                                backgroundColor: isDark ? '#12121a' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
                            }}>
                                <div style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="mb-2">Total Orders</div>
                                <div className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{stats.orders}</div>
                            </div>
                            <div className="p-6 rounded-xl" style={{ 
                                backgroundColor: isDark ? '#12121a' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
                            }}>
                                <div style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="mb-2">Active Users</div>
                                <div className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{stats.users}</div>
                            </div>
                            <div className="p-6 rounded-xl" style={{ 
                                backgroundColor: isDark ? '#12121a' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
                            }}>
                                <div style={{ color: isDark ? '#8b8b9e' : '#64748b' }} className="mb-2">Pending Queries</div>
                                <div className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{stats.queries}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="rounded-xl p-6" style={{ 
                                backgroundColor: isDark ? '#12121a' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
                            }}>
                                <h3 className="text-xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Recent Orders</h3>
                                <div className="space-y-4">
                                    {recentOrders.map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc' }}>
                                            <div>
                                                <div className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{order.id}</div>
                                                <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.user}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>${order.total}</div>
                                                <div className="text-sm" style={{ 
                                                    color: order.status === 'Delivered' ? '#22c55e' : order.status === 'Shipped' ? '#3b82f6' : '#eab308' 
                                                }}>{order.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl p-6" style={{ 
                                backgroundColor: isDark ? '#12121a' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
                            }}>
                                <h3 className="text-xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Recent Queries</h3>
                                <div className="space-y-4">
                                    {queries.map(query => (
                                        <div key={query.id} className="p-4 rounded-lg" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc' }}>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{query.name}</span>
                                                <span className="text-xs" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{query.date}</span>
                                            </div>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{query.message}</p>
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
