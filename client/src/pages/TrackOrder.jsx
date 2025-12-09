import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Search, Package, Truck, CheckCircle, Clock, X, Loader2, MapPinned, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const TrackOrder = () => {
    const { isDark } = useTheme();
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingOrder, setTrackingOrder] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [trackingError, setTrackingError] = useState('');
    const [searched, setSearched] = useState(false);

    // Track order function
    const handleTrackOrder = async (e) => {
        e.preventDefault();
        if (!trackingNumber.trim()) {
            setTrackingError('Please enter an order number');
            return;
        }

        setTrackingLoading(true);
        setTrackingError('');
        setTrackingOrder(null);
        setSearched(true);

        try {
            const response = await axios.get(`${API_URL}/api/stripe/orders/track/${trackingNumber.trim()}`);
            if (response.data.success) {
                setTrackingOrder(response.data.order);
            } else {
                setTrackingError('Order not found. Please check your order number.');
            }
        } catch (error) {
            setTrackingError('Order not found. Please check your order number and try again.');
        } finally {
            setTrackingLoading(false);
        }
    };

    // Get tracking stages based on status
    const getTrackingStages = (status) => {
        const stages = [
            { id: 1, name: 'Order Placed', icon: Package, description: 'Your order has been received and confirmed' },
            { id: 2, name: 'Processing', icon: Clock, description: 'We are preparing your items for dispatch' },
            { id: 3, name: 'Dispatched', icon: Truck, description: 'Your parcel has left our warehouse' },
            { id: 4, name: 'Out for Delivery', icon: MapPinned, description: 'Your parcel is with the courier for delivery today' },
            { id: 5, name: 'Delivered', icon: CheckCircle, description: 'Your parcel has been delivered successfully' },
        ];

        const statusMap = {
            'Pending': 1,
            'Processing': 2,
            'Shipped': 3,
            'Out for Delivery': 4,
            'Delivered': 5,
            'Cancelled': 0
        };

        const currentStage = statusMap[status] || 1;
        return stages.map(stage => ({ ...stage, completed: stage.id <= currentStage, current: stage.id === currentStage }));
    };

    return (
        <div className="pt-24 pb-20 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16">
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center top, rgba(168,85,247,0.15) 0%, transparent 60%)'
                    }}
                />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                        >
                            <Truck size={40} color="white" />
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
                            <span style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Track Your </span>
                            <span style={{ 
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Order
                            </span>
                        </h1>
                        
                        <p className="text-lg mb-8" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            Enter your order number to track your delivery status in real-time
                        </p>

                        {/* Search Form */}
                        <form onSubmit={handleTrackOrder} className="max-w-xl mx-auto">
                            <div 
                                className="flex gap-3 p-2 rounded-2xl"
                                style={{
                                    backgroundColor: isDark ? 'rgba(26,26,46,0.8)' : 'rgba(255,255,255,0.9)',
                                    border: `1px solid ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                                    boxShadow: '0 10px 40px rgba(168,85,247,0.15)'
                                }}
                            >
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                                    placeholder="Enter order number (e.g. ORD-0001)"
                                    className="flex-1 px-6 py-4 rounded-xl text-lg font-medium bg-transparent outline-none"
                                    style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                                />
                                <button
                                    type="submit"
                                    disabled={trackingLoading}
                                    className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                                    style={{
                                        background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 15px rgba(168,85,247,0.4)'
                                    }}
                                >
                                    {trackingLoading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <>
                                            <Search size={20} />
                                            Track
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {trackingError && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 text-sm"
                                style={{ color: '#ef4444' }}
                            >
                                {trackingError}
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Tracking Results */}
            {searched && trackingOrder && (
                <section className="py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-3xl overflow-hidden"
                            style={{
                                background: isDark 
                                    ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)' 
                                    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                                boxShadow: '0 25px 50px -12px rgba(168,85,247,0.2)'
                            }}
                        >
                            {/* Header */}
                            <div 
                                className="px-8 py-6"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(34,211,238,0.1) 100%)',
                                    borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
                                }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <p className="text-sm mb-1" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Order Number</p>
                                        <h2 className="text-2xl font-bold" style={{ color: '#a855f7' }}>
                                            {trackingOrder.order_number}
                                        </h2>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-sm mb-1" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Order Date</p>
                                        <p className="font-semibold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            {new Date(trackingOrder.created_at).toLocaleDateString('en-GB', { 
                                                weekday: 'long', 
                                                day: 'numeric', 
                                                month: 'long', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="px-8 py-10">
                                {trackingOrder.status === 'Cancelled' ? (
                                    <div className="text-center py-10">
                                        <div 
                                            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                                            style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
                                        >
                                            <X size={40} style={{ color: '#ef4444' }} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2" style={{ color: '#ef4444' }}>
                                            Order Cancelled
                                        </h3>
                                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                            This order has been cancelled. Please contact support for assistance.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-0">
                                        {getTrackingStages(trackingOrder.status).map((stage, index) => (
                                            <div key={stage.id} className="flex gap-6">
                                                {/* Timeline */}
                                                <div className="flex flex-col items-center">
                                                    <motion.div 
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${stage.current ? 'ring-4' : ''}`}
                                                        style={{ 
                                                            backgroundColor: stage.completed 
                                                                ? 'rgba(34,197,94,0.2)' 
                                                                : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                                            ringColor: stage.current ? 'rgba(34,197,94,0.3)' : 'transparent'
                                                        }}
                                                    >
                                                        <stage.icon 
                                                            size={24} 
                                                            style={{ 
                                                                color: stage.completed ? '#22c55e' : (isDark ? '#3a3a4a' : '#94a3b8')
                                                            }} 
                                                        />
                                                    </motion.div>
                                                    {index < 4 && (
                                                        <div 
                                                            className="w-1 h-16"
                                                            style={{ 
                                                                backgroundColor: stage.completed && getTrackingStages(trackingOrder.status)[index + 1]?.completed
                                                                    ? '#22c55e' 
                                                                    : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                {/* Stage Info */}
                                                <div className={`pb-8 ${index === 4 ? 'pb-0' : ''} flex-1`}>
                                                    <h4 
                                                        className="text-lg font-bold"
                                                        style={{ 
                                                            color: stage.completed 
                                                                ? (isDark ? '#ffffff' : '#0a0a0f')
                                                                : (isDark ? '#3a3a4a' : '#94a3b8')
                                                        }}
                                                    >
                                                        {stage.name}
                                                    </h4>
                                                    <p 
                                                        className="text-sm mt-1"
                                                        style={{ 
                                                            color: stage.completed 
                                                                ? (isDark ? '#8b8b9e' : '#64748b')
                                                                : (isDark ? '#2a2a3a' : '#cbd5e1')
                                                        }}
                                                    >
                                                        {stage.description}
                                                    </p>
                                                    {stage.current && (
                                                        <span 
                                                            className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold"
                                                            style={{ 
                                                                background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.2))', 
                                                                color: '#a855f7',
                                                                border: '1px solid rgba(168,85,247,0.3)'
                                                            }}
                                                        >
                                                            Current Status
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Order Details Footer */}
                            {trackingOrder.scheduled_date && (
                                <div 
                                    className="px-8 py-6"
                                    style={{ 
                                        backgroundColor: isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.1)',
                                        borderTop: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.2)'}`
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={24} style={{ color: '#22c55e' }} />
                                        <div>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                                Scheduled Delivery
                                            </p>
                                            <p className="font-bold text-lg" style={{ color: '#22c55e' }}>
                                                {new Date(trackingOrder.scheduled_date).toLocaleDateString('en-GB', { 
                                                    weekday: 'long', 
                                                    day: 'numeric', 
                                                    month: 'long' 
                                                })}
                                                {trackingOrder.scheduled_time && ` at ${trackingOrder.scheduled_time}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Help Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div 
                        className="rounded-2xl p-8 text-center"
                        style={{
                            background: isDark 
                                ? 'linear-gradient(145deg, rgba(26,26,46,0.5) 0%, rgba(18,18,26,0.5) 100%)'
                                : 'linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(248,250,252,0.5) 100%)',
                            border: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.1)'}`
                        }}
                    >
                        <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                            Need Help?
                        </h3>
                        <p className="mb-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            If you have any questions about your order, please contact our support team
                        </p>
                        <a 
                            href="mailto:support@old-arcade.com"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                color: '#ffffff'
                            }}
                        >
                            Contact Support
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrackOrder;
