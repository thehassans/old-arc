import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, MessageSquare, Users, Settings, LogOut, Save, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDark } = useTheme();
    const navigate = useNavigate();

    // Check authentication
    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/login');
        }
    }, [navigate]);

    // Settings state
    const [settings, setSettings] = useState({
        phone: '+447782260144',
        email: 'hello@old-arcade.com',
        address: 'London, UK',
        facebook: 'https://facebook.com/oldarcade',
        twitter: 'https://twitter.com/oldarcade',
        instagram: 'https://instagram.com/oldarcade',
        youtube: 'https://youtube.com/oldarcade',
    });

    const [saved, setSaved] = useState(false);

    // Stats data
    const stats = {
        orders: 124,
        revenue: 15490.50,
        users: 850,
        queries: 12
    };

    const recentOrders = [
        { id: '#ORD-001', user: 'John Doe', email: 'john@email.com', total: 249.99, status: 'Processing', date: '2024-12-03', items: 3 },
        { id: '#ORD-002', user: 'Jane Smith', email: 'jane@email.com', total: 89.99, status: 'Shipped', date: '2024-12-02', items: 1 },
        { id: '#ORD-003', user: 'Mike Johnson', email: 'mike@email.com', total: 129.99, status: 'Delivered', date: '2024-12-01', items: 2 },
        { id: '#ORD-004', user: 'Sarah Williams', email: 'sarah@email.com', total: 199.99, status: 'Processing', date: '2024-12-03', items: 2 },
        { id: '#ORD-005', user: 'Tom Brown', email: 'tom@email.com', total: 59.99, status: 'Pending', date: '2024-12-04', items: 1 },
    ];

    const queries = [
        { id: 1, name: 'Alice Brown', email: 'alice@example.com', message: 'When will the Retro Console X be back in stock?', date: '2 hrs ago', status: 'new' },
        { id: 2, name: 'Bob Wilson', email: 'bob@example.com', message: 'Do you ship internationally?', date: '5 hrs ago', status: 'read' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com', message: 'I need help with my order #ORD-003', date: '1 day ago', status: 'replied' },
    ];

    const users = [
        { id: 1, name: 'John Doe', email: 'john@email.com', orders: 5, spent: 549.95, joined: '2024-10-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@email.com', orders: 3, spent: 289.97, joined: '2024-11-01' },
        { id: 3, name: 'Mike Johnson', email: 'mike@email.com', orders: 8, spent: 899.92, joined: '2024-09-20' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const handleSaveSettings = () => {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const cardStyle = {
        backgroundColor: isDark ? '#12121a' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}`
    };

    const inputStyle = {
        backgroundColor: isDark ? '#0a0a0f' : '#f8fafc',
        border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`,
        color: isDark ? '#ffffff' : '#0a0a0f'
    };

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f1f5f9' }}>
            {/* Sidebar */}
            <div className="w-64 hidden md:flex flex-col" style={{ 
                backgroundColor: isDark ? '#12121a' : '#ffffff',
                borderRight: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` 
            }}>
                <div className="p-6 flex items-center gap-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                        <LayoutDashboard size={20} color="white" />
                    </div>
                    <h2 className="text-lg font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Admin Panel</h2>
                </div>
                <nav className="flex-grow px-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                        { id: 'queries', icon: MessageSquare, label: 'Queries' },
                        { id: 'users', icon: Users, label: 'Users' },
                        { id: 'settings', icon: Settings, label: 'Settings' },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" style={{
                            backgroundColor: activeTab === item.id ? '#a855f7' : 'transparent',
                            color: activeTab === item.id ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                        }}>
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4" style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-red-500/10" style={{ color: '#ef4444' }}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-4" style={{ backgroundColor: isDark ? '#12121a' : '#ffffff', borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                            <LayoutDashboard size={16} color="white" />
                        </div>
                        <h2 className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Admin Panel</h2>
                    </div>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <nav className="mt-4 space-y-2">
                        {[
                            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                            { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                            { id: 'queries', icon: MessageSquare, label: 'Queries' },
                            { id: 'users', icon: Users, label: 'Users' },
                            { id: 'settings', icon: Settings, label: 'Settings' },
                        ].map(item => (
                            <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg" style={{
                                backgroundColor: activeTab === item.id ? '#a855f7' : 'transparent',
                                color: activeTab === item.id ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                            }}>
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg" style={{ color: '#ef4444' }}>
                            <LogOut size={20} />
                            Logout
                        </button>
                    </nav>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 overflow-y-auto md:pt-8 pt-20">
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

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Orders</h1>
                        <div className="rounded-xl overflow-hidden" style={cardStyle}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc' }}>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Order ID</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Customer</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Items</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Total</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Status</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map(order => (
                                            <tr key={order.id} style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                                                <td className="p-4 font-medium" style={{ color: '#a855f7' }}>{order.id}</td>
                                                <td className="p-4">
                                                    <div style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{order.user}</div>
                                                    <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.email}</div>
                                                </td>
                                                <td className="p-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{order.items}</td>
                                                <td className="p-4 font-semibold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>£{order.total}</td>
                                                <td className="p-4">
                                                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                                                        backgroundColor: order.status === 'Delivered' ? 'rgba(34,197,94,0.1)' : order.status === 'Shipped' ? 'rgba(59,130,246,0.1)' : order.status === 'Processing' ? 'rgba(234,179,8,0.1)' : 'rgba(168,85,247,0.1)',
                                                        color: order.status === 'Delivered' ? '#22c55e' : order.status === 'Shipped' ? '#3b82f6' : order.status === 'Processing' ? '#eab308' : '#a855f7'
                                                    }}>{order.status}</span>
                                                </td>
                                                <td className="p-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Queries Tab */}
                {activeTab === 'queries' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Customer Queries</h1>
                        <div className="grid gap-4">
                            {queries.map(query => (
                                <div key={query.id} className="p-6 rounded-xl" style={cardStyle}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{query.name}</h3>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{query.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{query.date}</span>
                                            <span className="px-2 py-1 rounded text-xs font-medium" style={{
                                                backgroundColor: query.status === 'new' ? 'rgba(239,68,68,0.1)' : query.status === 'read' ? 'rgba(234,179,8,0.1)' : 'rgba(34,197,94,0.1)',
                                                color: query.status === 'new' ? '#ef4444' : query.status === 'read' ? '#eab308' : '#22c55e'
                                            }}>{query.status}</span>
                                        </div>
                                    </div>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{query.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Users</h1>
                        <div className="rounded-xl overflow-hidden" style={cardStyle}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc' }}>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Name</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Email</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Orders</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Total Spent</th>
                                            <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id} style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                                                <td className="p-4 font-medium" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{user.name}</td>
                                                <td className="p-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{user.email}</td>
                                                <td className="p-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{user.orders}</td>
                                                <td className="p-4 font-semibold" style={{ color: '#22c55e' }}>£{user.spent}</td>
                                                <td className="p-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{user.joined}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-6 max-w-4xl">
                        <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Settings</h1>
                        
                        {saved && (
                            <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                                Settings saved successfully!
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="p-6 rounded-xl space-y-4" style={cardStyle}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <Phone size={16} className="inline mr-2" />Phone
                                    </label>
                                    <input type="text" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <Mail size={16} className="inline mr-2" />Email
                                    </label>
                                    <input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <MapPin size={16} className="inline mr-2" />Address
                                    </label>
                                    <input type="text" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="p-6 rounded-xl space-y-4" style={cardStyle}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Social Media Links</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <Facebook size={16} className="inline mr-2" />Facebook
                                    </label>
                                    <input type="url" value={settings.facebook} onChange={(e) => setSettings({...settings, facebook: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <Twitter size={16} className="inline mr-2" />Twitter
                                    </label>
                                    <input type="url" value={settings.twitter} onChange={(e) => setSettings({...settings, twitter: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <Instagram size={16} className="inline mr-2" />Instagram
                                    </label>
                                    <input type="url" value={settings.instagram} onChange={(e) => setSettings({...settings, instagram: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <Youtube size={16} className="inline mr-2" />YouTube
                                    </label>
                                    <input type="url" value={settings.youtube} onChange={(e) => setSettings({...settings, youtube: e.target.value})} className="w-full px-4 py-3 rounded-lg" style={inputStyle} />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                            <Save size={20} />
                            Save Settings
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
