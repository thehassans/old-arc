import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Gamepad2, Mail, MapPin, Phone, Search, Package, Truck, CheckCircle, Clock, X, Loader2, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const Footer = () => {
    const { isDark } = useTheme();
    
    // Tracking state
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingOrder, setTrackingOrder] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [trackingError, setTrackingError] = useState('');
    const [showTrackingModal, setShowTrackingModal] = useState(false);

    // Default settings
    const defaultSettings = {
        phone: '+447782260144',
        email: 'support@old-arcade.com',
        address: '7 Llewellyn Close, Stourport-On-Severn, England, DY13 9RH',
        aboutUs: 'Your premium destination for retro gaming excellence. Authorized Amazon seller and official gaming distributor. Discover legendary consoles, timeless games, and elite accessories from Retro Arcade Co LTD.',
        facebook: 'https://facebook.com/oldarcade',
        twitter: 'https://twitter.com/oldarcade',
        instagram: 'https://instagram.com/oldarcade',
        youtube: 'https://youtube.com/oldarcade',
    };

    const [settings, setSettings] = useState(defaultSettings);

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            try {
                setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
            } catch (e) {
                console.error('Error parsing settings:', e);
            }
        }

        // Listen for storage changes (when admin saves settings)
        const handleStorageChange = () => {
            const updated = localStorage.getItem('siteSettings');
            if (updated) {
                try {
                    setSettings({ ...defaultSettings, ...JSON.parse(updated) });
                } catch (e) {
                    console.error('Error parsing settings:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('settingsUpdated', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('settingsUpdated', handleStorageChange);
        };
    }, []);

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

        try {
            const response = await axios.get(`${API_URL}/api/stripe/orders/track/${trackingNumber.trim()}`);
            if (response.data.success) {
                setTrackingOrder(response.data.order);
                setShowTrackingModal(true);
            } else {
                setTrackingError('Order not found. Please check your order number.');
            }
        } catch (error) {
            setTrackingError('Order not found. Please check your order number.');
        } finally {
            setTrackingLoading(false);
        }
    };

    // Get tracking stages based on status
    const getTrackingStages = (status) => {
        const stages = [
            { id: 1, name: 'Order Placed', icon: Package, description: 'Your order has been received' },
            { id: 2, name: 'Processing', icon: Clock, description: 'Preparing your items for dispatch' },
            { id: 3, name: 'Dispatched', icon: Truck, description: 'Your parcel is on its way' },
            { id: 4, name: 'Out for Delivery', icon: MapPinned, description: 'With courier for delivery today' },
            { id: 5, name: 'Delivered', icon: CheckCircle, description: 'Successfully delivered' },
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

    const footerLinks = {
        shop: [
            { label: 'All Products', path: '/shop' },
            { label: 'Consoles', path: '/consoles' },
            { label: 'Games', path: '/games' },
            { label: 'Accessories', path: '/shop?category=accessories' },
        ],
        support: [
            { label: 'Contact Us', path: '/contact' },
            { label: 'FAQs', path: '/faq' },
            { label: 'Shipping & Returns', path: '/shipping' },
            { label: 'Track Order', path: '/track-order' },
            { label: 'About Us', path: '/about' },
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: settings.facebook || '#', label: 'Facebook' },
        { icon: Twitter, href: settings.twitter || '#', label: 'Twitter' },
        { icon: Instagram, href: settings.instagram || '#', label: 'Instagram' },
        { icon: Youtube, href: settings.youtube || '#', label: 'Youtube' },
    ];

    return (
        <footer 
            className="relative overflow-hidden"
            style={{ 
                backgroundColor: isDark ? '#0a0a0f' : '#fafafa',
                borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`
            }}
        >
            {/* Background Glow */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div 
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                    boxShadow: '0 4px 15px rgba(168,85,247,0.3)'
                                }}
                            >
                                <Gamepad2 size={24} color="white" />
                            </div>
                            <span className="text-2xl font-display font-black" style={{ 
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                OLD ARCADE
                            </span>
                        </Link>
                        <p 
                            className="text-sm leading-relaxed mb-4"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                        >
                            {settings.aboutUs}
                        </p>
                        
                        {/* Company Badge */}
                        <div className="space-y-3 mb-6">
                            <div 
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(34,211,238,0.1) 100%)',
                                    border: `1px solid ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`
                                }}
                            >
                                <span className="text-sm font-bold" style={{ color: '#a855f7' }}>Retro Arcade Co LTD</span>
                            </div>
                            
                            {/* Amazon Authorized Badge - Premium */}
                            <Link 
                                to="/about"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                                style={{ 
                                    background: 'linear-gradient(135deg, #232F3E 0%, #131921 100%)',
                                    border: '1px solid rgba(255,153,0,0.5)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                                }}
                            >
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 p-1.5" style={{ backgroundColor: '#ffffff' }}>
                                    <svg viewBox="0 0 100 30" className="w-full h-auto">
                                        <path fill="#232F3E" d="M25.5,17.2c0,0.7,0.1,1.3,0.2,1.7c0.2,0.4,0.4,0.9,0.7,1.4c0.1,0.2,0.2,0.3,0.2,0.4c0,0.2-0.1,0.3-0.3,0.5l-1.1,0.7c-0.1,0.1-0.3,0.1-0.4,0.1c-0.2,0-0.3-0.1-0.5-0.3c-0.3-0.3-0.5-0.7-0.7-1c-0.2-0.4-0.4-0.8-0.6-1.3c-1.6,1.9-3.6,2.8-6,2.8c-1.7,0-3.1-0.5-4.1-1.5c-1-1-1.5-2.3-1.5-3.9c0-1.7,0.6-3.1,1.8-4.2c1.2-1.1,2.9-1.6,4.9-1.6c0.7,0,1.4,0.1,2.1,0.2c0.7,0.1,1.5,0.3,2.3,0.5v-1.5c0-1.5-0.3-2.6-0.9-3.2c-0.6-0.6-1.7-0.9-3.2-0.9c-0.7,0-1.4,0.1-2.1,0.3c-0.7,0.2-1.4,0.4-2.1,0.7c-0.3,0.1-0.5,0.2-0.6,0.2c-0.1,0-0.2,0-0.3,0c-0.2,0-0.3-0.2-0.3-0.5V5.4c0-0.3,0-0.5,0.1-0.6c0.1-0.1,0.2-0.2,0.5-0.4c0.7-0.3,1.5-0.6,2.5-0.9c1-0.2,2-0.4,3.2-0.4c2.4,0,4.2,0.6,5.3,1.7c1.1,1.1,1.6,2.8,1.6,5.1V17.2z M19.5,19.1c0.7,0,1.3-0.1,2.1-0.4c0.7-0.3,1.3-0.7,1.8-1.3c0.3-0.4,0.5-0.8,0.6-1.3c0.1-0.5,0.2-1.1,0.2-1.8v-0.9c-0.6-0.2-1.2-0.3-1.8-0.4c-0.6-0.1-1.2-0.1-1.8-0.1c-1.4,0-2.4,0.3-3,0.8c-0.7,0.5-1,1.3-1,2.4c0,1,0.3,1.7,0.8,2.2C18,18.9,18.6,19.1,19.5,19.1z"/>
                                        <path fill="#232F3E" d="M38.7,21.5c-0.2,0-0.4,0-0.5-0.1c-0.1-0.1-0.2-0.3-0.3-0.5l-5.6-18.4c-0.1-0.3-0.2-0.5-0.2-0.6c0-0.2,0.1-0.4,0.4-0.4h1.7c0.3,0,0.4,0,0.5,0.1c0.1,0.1,0.2,0.3,0.3,0.5l4,15.7l3.7-15.7c0.1-0.3,0.1-0.4,0.3-0.5c0.1-0.1,0.3-0.1,0.5-0.1h1.4c0.3,0,0.4,0,0.5,0.1c0.1,0.1,0.2,0.3,0.3,0.5l3.7,15.9l4.1-15.9c0.1-0.3,0.2-0.4,0.3-0.5c0.1-0.1,0.3-0.1,0.5-0.1h1.6c0.2,0,0.4,0.1,0.4,0.4c0,0.1,0,0.2,0,0.3c0,0.1-0.1,0.2-0.1,0.3l-5.7,18.4c-0.1,0.3-0.2,0.4-0.3,0.5c-0.1,0.1-0.3,0.1-0.5,0.1h-1.5c-0.3,0-0.4,0-0.5-0.1c-0.1-0.1-0.2-0.3-0.3-0.5l-3.6-15.3l-3.6,15.3c-0.1,0.3-0.1,0.4-0.3,0.5c-0.1,0.1-0.3,0.1-0.5,0.1H38.7z"/>
                                        <path fill="#232F3E" d="M67.3,22.1c-1.3,0-2.6-0.2-3.8-0.5c-1.2-0.3-2.2-0.7-2.8-1.1c-0.4-0.2-0.6-0.5-0.7-0.7c-0.1-0.2-0.1-0.4-0.1-0.6v-0.9c0-0.4,0.1-0.5,0.4-0.5c0.1,0,0.2,0,0.3,0.1c0.1,0,0.2,0.1,0.4,0.2c0.5,0.3,1.1,0.5,1.8,0.6c0.7,0.2,1.3,0.2,2,0.2c1.1,0,1.9-0.2,2.5-0.6c0.6-0.4,0.9-1,0.9-1.7c0-0.5-0.2-0.9-0.5-1.3c-0.3-0.4-1-0.7-1.9-1l-2.8-0.9c-1.4-0.4-2.4-1.1-3-2c-0.6-0.9-0.9-1.8-0.9-2.9c0-0.8,0.2-1.6,0.5-2.2c0.3-0.7,0.8-1.2,1.4-1.7c0.6-0.5,1.3-0.8,2.1-1.1c0.8-0.2,1.7-0.4,2.6-0.4c0.5,0,0.9,0,1.4,0.1c0.5,0.1,0.9,0.2,1.4,0.3c0.4,0.1,0.8,0.3,1.2,0.4c0.4,0.2,0.6,0.3,0.8,0.5c0.3,0.2,0.4,0.3,0.5,0.5c0.1,0.2,0.1,0.4,0.1,0.7v0.8c0,0.4-0.1,0.5-0.4,0.5c-0.1,0-0.3-0.1-0.5-0.2c-0.9-0.4-1.9-0.6-3-0.6c-1,0-1.7,0.2-2.3,0.5c-0.5,0.3-0.8,0.9-0.8,1.6c0,0.5,0.2,1,0.5,1.3c0.4,0.4,1,0.7,2,1l2.7,0.9c1.4,0.4,2.3,1.1,2.9,1.9c0.6,0.8,0.8,1.8,0.8,2.8c0,0.9-0.2,1.6-0.5,2.3c-0.3,0.7-0.8,1.3-1.4,1.8c-0.6,0.5-1.3,0.9-2.2,1.1C69.3,22,68.3,22.1,67.3,22.1z"/>
                                        <path fill="#FF9900" d="M72.5,26.3c-6.7,4.9-16.3,7.5-24.6,7.5c-11.7,0-22.1-4.3-30.1-11.5c-0.6-0.6-0.1-1.3,0.7-0.9c8.6,5,19.2,8,30.1,8c7.4,0,15.5-1.5,22.9-4.7C72.6,24.3,73.5,25.5,72.5,26.3z"/>
                                        <path fill="#FF9900" d="M75,23.3c-0.9-1.1-5.7-0.5-7.9-0.3c-0.7,0.1-0.8-0.5-0.2-0.9c3.9-2.7,10.2-1.9,10.9-1c0.7,0.9-0.2,7.3-3.8,10.3c-0.6,0.5-1.1,0.2-0.9-0.4C74,28.6,75.9,24.4,75,23.3z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white">Authorized Seller</span>
                                        <CheckCircle size={14} style={{ color: '#FF9900' }} />
                                    </div>
                                    <span className="text-xs" style={{ color: '#FF9900' }}>amazon.co.uk</span>
                                </div>
                            </Link>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                        color: isDark ? '#8b8b9e' : '#64748b'
                                    }}
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 
                            className="font-bold text-lg mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        to={link.path}
                                        className="text-sm transition-colors hover:translate-x-1 inline-block"
                                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                                        onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                                        onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 
                            className="font-bold text-lg mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        to={link.path}
                                        className="text-sm transition-colors"
                                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                                        onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                                        onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 
                            className="font-bold text-lg mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                                    }}
                                >
                                    <Mail size={18} style={{ color: '#a855f7' }} />
                                </div>
                                <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {settings.email}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(8,145,178,0.1)'
                                    }}
                                >
                                    <Phone size={18} style={{ color: '#22d3ee' }} />
                                </div>
                                <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {settings.phone}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(236,72,153,0.1)' : 'rgba(219,39,119,0.1)'
                                    }}
                                >
                                    <MapPin size={18} style={{ color: '#ec4899' }} />
                                </div>
                                <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {settings.address}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Track Your Order Section - Minimal */}
                <div 
                    className="py-6 mb-6"
                    style={{ 
                        borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`,
                        borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`
                    }}
                >
                    <div className="flex items-center justify-center gap-4">
                        <Truck size={20} style={{ color: '#a855f7' }} />
                        <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            Have an order?
                        </span>
                        <Link
                            to="/track-order"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                            style={{
                                backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.1)',
                                color: '#a855f7',
                                border: `1px solid ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`
                            }}
                        >
                            Track Order
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div 
                    className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ 
                        borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` 
                    }}
                >
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            © {new Date().getFullYear()} Old Arcade. All rights reserved.
                        </p>
                        <span className="hidden sm:inline" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>•</span>
                        <a 
                            href="https://vitalblaze.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium transition-colors"
                            style={{ color: '#a855f7' }}
                        >
                            Powered by VITALBLAZE
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link 
                            to="/terms" 
                            className="text-sm transition-colors"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                            onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                        >
                            Terms
                        </Link>
                        <Link 
                            to="/privacy" 
                            className="text-sm transition-colors"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                            onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                        >
                            Privacy
                        </Link>
                        <Link 
                            to="/cookies" 
                            className="text-sm transition-colors"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                            onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tracking Modal */}
            {showTrackingModal && trackingOrder && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg rounded-2xl overflow-hidden"
                        style={{
                            background: isDark 
                                ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)' 
                                : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                            border: `1px solid ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                            boxShadow: '0 25px 50px -12px rgba(168,85,247,0.25)'
                        }}
                    >
                        {/* Modal Header */}
                        <div 
                            className="px-6 py-5 flex items-center justify-between"
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(34,211,238,0.1) 100%)',
                                borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                                >
                                    <Truck size={24} color="white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                        Order Tracking
                                    </h2>
                                    <p className="text-sm font-medium" style={{ color: '#a855f7' }}>
                                        {trackingOrder.order_number}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowTrackingModal(false)}
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                            >
                                <X size={20} style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                            </button>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="px-6 py-6">
                            {trackingOrder.status === 'Cancelled' ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
                                        <X size={32} style={{ color: '#ef4444' }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2" style={{ color: '#ef4444' }}>Order Cancelled</h3>
                                    <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        This order has been cancelled. Contact support for assistance.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-0">
                                    {getTrackingStages(trackingOrder.status).map((stage, index) => (
                                        <div key={stage.id} className="flex gap-4">
                                            {/* Timeline Line */}
                                            <div className="flex flex-col items-center">
                                                <div 
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${stage.current ? 'ring-4' : ''}`}
                                                    style={{ 
                                                        backgroundColor: stage.completed 
                                                            ? 'rgba(34,197,94,0.2)' 
                                                            : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                                        ringColor: stage.current ? 'rgba(34,197,94,0.3)' : 'transparent'
                                                    }}
                                                >
                                                    <stage.icon 
                                                        size={18} 
                                                        style={{ 
                                                            color: stage.completed ? '#22c55e' : (isDark ? '#3a3a4a' : '#94a3b8')
                                                        }} 
                                                    />
                                                </div>
                                                {index < 4 && (
                                                    <div 
                                                        className="w-0.5 h-8"
                                                        style={{ 
                                                            backgroundColor: stage.completed && getTrackingStages(trackingOrder.status)[index + 1]?.completed
                                                                ? '#22c55e' 
                                                                : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            {/* Stage Info */}
                                            <div className={`pb-6 ${index === 4 ? 'pb-0' : ''}`}>
                                                <h4 
                                                    className="font-semibold"
                                                    style={{ 
                                                        color: stage.completed 
                                                            ? (isDark ? '#ffffff' : '#0a0a0f')
                                                            : (isDark ? '#3a3a4a' : '#94a3b8')
                                                    }}
                                                >
                                                    {stage.name}
                                                </h4>
                                                <p 
                                                    className="text-sm"
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
                                                        className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium"
                                                        style={{ backgroundColor: 'rgba(168,85,247,0.2)', color: '#a855f7' }}
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

                        {/* Order Details */}
                        <div 
                            className="px-6 py-4"
                            style={{ 
                                backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)',
                                borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
                            }}
                        >
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Order Date</p>
                                    <p className="font-semibold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                        {new Date(trackingOrder.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Items</p>
                                    <p className="font-semibold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                        {trackingOrder.items?.length || 0} item(s)
                                    </p>
                                </div>
                                {trackingOrder.scheduled_date && (
                                    <div className="col-span-2">
                                        <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Scheduled Delivery</p>
                                        <p className="font-semibold" style={{ color: '#22c55e' }}>
                                            {new Date(trackingOrder.scheduled_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
                                            {trackingOrder.scheduled_time && ` at ${trackingOrder.scheduled_time}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
