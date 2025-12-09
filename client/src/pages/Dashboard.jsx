import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { User, Package, Settings, LogOut, ShoppingBag, Clock, CheckCircle, Truck, MapPin, ChevronRight, Mail, Calendar } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const Dashboard = () => {
    const { isDark } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/account');
            return;
        }
        fetchUserOrders();
    }, [isAuthenticated, navigate]);

    const fetchUserOrders = async () => {
        try {
            // Fetch all orders and filter by user email
            const response = await axios.get(`${API_URL}/api/stripe/orders`);
            const userOrders = response.data.filter(order => 
                order.customer_email === user?.email
            );
            setOrders(userOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return '#22c55e';
            case 'Shipped': return '#3b82f6';
            case 'Processing': return '#eab308';
            case 'Cancelled': return '#ef4444';
            default: return '#a855f7';
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case 'Delivered': return 'rgba(34,197,94,0.1)';
            case 'Shipped': return 'rgba(59,130,246,0.1)';
            case 'Processing': return 'rgba(234,179,8,0.1)';
            case 'Cancelled': return 'rgba(239,68,68,0.1)';
            default: return 'rgba(168,85,247,0.1)';
        }
    };

    const cardStyle = {
        backgroundColor: isDark ? '#12121a' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}`
    };

    if (!isAuthenticated) return null;

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                        My Account
                    </h1>
                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                        Welcome back, {user?.name}!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl p-6" style={cardStyle}>
                            {/* User Info */}
                            <div className="text-center mb-6 pb-6" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                                <div 
                                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                                >
                                    <User size={40} color="white" />
                                </div>
                                <h3 className="font-bold text-lg" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    {user?.name}
                                </h3>
                                <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {user?.email}
                                </p>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        activeTab === 'orders' ? 'text-white' : ''
                                    }`}
                                    style={{
                                        backgroundColor: activeTab === 'orders' ? '#a855f7' : 'transparent',
                                        color: activeTab === 'orders' ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                                    }}
                                >
                                    <Package size={20} />
                                    <span className="font-medium">My Orders</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all`}
                                    style={{
                                        backgroundColor: activeTab === 'profile' ? '#a855f7' : 'transparent',
                                        color: activeTab === 'profile' ? '#ffffff' : (isDark ? '#8b8b9e' : '#64748b')
                                    }}
                                >
                                    <Settings size={20} />
                                    <span className="font-medium">Profile Settings</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-500/10"
                                    style={{ color: '#ef4444' }}
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                        Order History
                                    </h2>
                                    <Link
                                        to="/track-order"
                                        className="text-sm font-medium flex items-center gap-1"
                                        style={{ color: '#a855f7' }}
                                    >
                                        Track Order <ChevronRight size={16} />
                                    </Link>
                                </div>

                                {loading ? (
                                    <div className="rounded-2xl p-12 text-center" style={cardStyle}>
                                        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Loading orders...</p>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="rounded-2xl p-12 text-center" style={cardStyle}>
                                        <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                        <h3 className="font-bold text-lg mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            No orders yet
                                        </h3>
                                        <p className="mb-6" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                            Start shopping to see your orders here
                                        </p>
                                        <Link
                                            to="/shop"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                                            style={{
                                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                                color: '#ffffff'
                                            }}
                                        >
                                            Browse Products
                                            <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map(order => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="rounded-2xl overflow-hidden"
                                                style={cardStyle}
                                            >
                                                {/* Order Header */}
                                                <div 
                                                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                                    style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.05)' : 'rgba(168,85,247,0.03)' }}
                                                >
                                                    <div>
                                                        <p className="font-bold" style={{ color: '#a855f7' }}>
                                                            {order.order_number}
                                                        </p>
                                                        <p className="text-sm flex items-center gap-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                                            <Calendar size={14} />
                                                            {new Date(order.created_at).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span 
                                                            className="px-3 py-1 rounded-full text-sm font-medium"
                                                            style={{ 
                                                                backgroundColor: getStatusBg(order.status),
                                                                color: getStatusColor(order.status)
                                                            }}
                                                        >
                                                            {order.status}
                                                        </span>
                                                        <span className="font-bold text-lg" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                                            £{order.total_amount?.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Order Items */}
                                                <div className="px-6 py-4">
                                                    <div className="space-y-3">
                                                        {order.items?.slice(0, 3).map((item, index) => (
                                                            <div key={index} className="flex items-center gap-4">
                                                                <div 
                                                                    className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
                                                                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                                                >
                                                                    {item.image_url ? (
                                                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <Package size={20} style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-medium truncate" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                                                        {item.title}
                                                                    </p>
                                                                    <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                                                        Qty: {item.quantity} × £{item.price?.toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {order.items?.length > 3 && (
                                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                                                +{order.items.length - 3} more item(s)
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Order Footer */}
                                                <div 
                                                    className="px-6 py-3 flex items-center justify-between"
                                                    style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` }}
                                                >
                                                    <div className="flex items-center gap-2 text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                                        {order.payment_method === 'paypal' ? (
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
                                                                </svg>
                                                                PayPal
                                                            </span>
                                                        ) : (
                                                            <span>Stripe</span>
                                                        )}
                                                    </div>
                                                    <Link
                                                        to={`/track-order?order=${order.order_number}`}
                                                        className="text-sm font-medium flex items-center gap-1"
                                                        style={{ color: '#a855f7' }}
                                                    >
                                                        <Truck size={16} />
                                                        Track Order
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="rounded-2xl p-6" style={cardStyle}>
                                <h2 className="text-xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Profile Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                                        <User size={20} style={{ color: '#a855f7' }} />
                                        <div>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Full Name</p>
                                            <p className="font-medium" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{user?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                                        <Mail size={20} style={{ color: '#a855f7' }} />
                                        <div>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Email Address</p>
                                            <p className="font-medium" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                                        <Calendar size={20} style={{ color: '#a855f7' }} />
                                        <div>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Member Since</p>
                                            <p className="font-medium" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
