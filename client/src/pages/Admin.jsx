import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, MessageSquare, Users, Settings, LogOut, Save, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Menu, X, Loader2, RefreshCw, Calendar, Clock, Edit2, Check, XCircle, Package, Plus, Trash2, Image, Upload, Sparkles, Truck, Copy, MessageCircle, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

// UK Courier options
const courierOptions = [
    { id: 'evri', name: 'Evri (Hermes)' },
    { id: 'yodel', name: 'Yodel' },
    { id: 'dpd', name: 'DPD Local' },
    { id: 'parcelforce', name: 'Parcelforce' },
];

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDark } = useTheme();
    const navigate = useNavigate();

    // Orders state
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [editForm, setEditForm] = useState({ status: '', courier: '', tracking_id: '', order_date: '' });
    
    // Shipping/Delivery Modal state
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [shippingModalOrder, setShippingModalOrder] = useState(null);
    const [shippingForm, setShippingForm] = useState({ courier: '', tracking_id: '', shipped_date: '' });
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [deliveryForm, setDeliveryForm] = useState({ delivered_date: '' });

    // Products state
    const [productsData, setProductsData] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        title: '', description: '', price: '', category: 'Consoles', image_url: '', stock: ''
    });
    const productCategories = ['Consoles', 'Games', 'Accessories', 'Merch'];

    // Support tickets state
    const [supportTickets, setSupportTickets] = useState([]);
    const [ticketsLoading, setTicketsLoading] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [adminReply, setAdminReply] = useState('');
    const [editingMessage, setEditingMessage] = useState(null);

    // Check authentication
    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    // Fetch orders when orders tab is active
    useEffect(() => {
        if (activeTab === 'orders' || activeTab === 'dashboard') {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/stripe/orders`);
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order.id);
        setEditForm({
            status: order.status,
            courier: order.courier || '',
            tracking_id: order.tracking_id || '',
            order_date: order.created_at ? order.created_at.split('T')[0] : ''
        });
    };

    const handleSaveOrder = async (orderId) => {
        try {
            await axios.put(`${API_URL}/api/stripe/orders/${orderId}`, editForm);
            setEditingOrder(null);
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingOrder(null);
        setEditForm({ status: '', courier: '', tracking_id: '', order_date: '' });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    // Handle status change - show modal for Shipped/Delivered
    const handleStatusChange = (order, newStatus) => {
        if (newStatus === 'Shipped') {
            setShippingModalOrder(order);
            setShippingForm({ 
                courier: order.courier || 'evri', 
                tracking_id: order.tracking_id || '', 
                shipped_date: new Date().toISOString().split('T')[0] 
            });
            setShowShippingModal(true);
        } else if (newStatus === 'Delivered') {
            setShippingModalOrder(order);
            setDeliveryForm({ delivered_date: new Date().toISOString().split('T')[0] });
            setShowDeliveryModal(true);
        } else {
            // Direct update for other statuses
            updateOrderStatus(order.id, { status: newStatus });
        }
    };

    // Submit shipping details
    const handleShippingSubmit = async () => {
        if (!shippingForm.courier) {
            alert('Please select a courier');
            return;
        }
        await updateOrderStatus(shippingModalOrder.id, {
            status: 'Shipped',
            courier: shippingForm.courier,
            tracking_id: shippingForm.tracking_id,
            shipped_date: shippingForm.shipped_date
        });
        setShowShippingModal(false);
        setShippingModalOrder(null);
    };

    // Submit delivery details
    const handleDeliverySubmit = async () => {
        await updateOrderStatus(shippingModalOrder.id, {
            status: 'Delivered',
            delivered_date: deliveryForm.delivered_date
        });
        setShowDeliveryModal(false);
        setShippingModalOrder(null);
    };

    // Update order status API call
    const updateOrderStatus = async (orderId, data) => {
        try {
            await axios.put(`${API_URL}/api/stripe/orders/${orderId}`, data);
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    // Fetch products when products tab is active
    useEffect(() => {
        if (activeTab === 'products' || activeTab === 'dashboard') {
            fetchProducts();
        }
    }, [activeTab]);

    const fetchProducts = async () => {
        setProductsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/stripe/products`);
            setProductsData(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setProductsLoading(false);
        }
    };

    // Fetch support tickets when queries tab is active
    useEffect(() => {
        if (activeTab === 'queries') {
            fetchTickets();
        }
    }, [activeTab]);

    const fetchTickets = async () => {
        setTicketsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/support/tickets`);
            setSupportTickets(response.data);
        } catch (error) {
            console.error('Failed to fetch tickets:', error);
        } finally {
            setTicketsLoading(false);
        }
    };

    const handleAdminReply = async (e) => {
        e.preventDefault();
        if (!adminReply.trim() || !selectedTicket) return;
        try {
            const response = await axios.post(`${API_URL}/api/support/tickets/${selectedTicket.id}/messages`, {
                message: adminReply,
                sender: 'admin',
                senderName: 'Support Team'
            });
            setSelectedTicket(response.data.ticket);
            setSupportTickets(supportTickets.map(t => t.id === response.data.ticket.id ? response.data.ticket : t));
            setAdminReply('');
        } catch (error) {
            console.error('Failed to send reply:', error);
        }
    };

    const handleUpdateTicketStatus = async (ticketId, status) => {
        try {
            const response = await axios.put(`${API_URL}/api/support/tickets/${ticketId}`, { status });
            setSupportTickets(supportTickets.map(t => t.id === ticketId ? response.data.ticket : t));
            if (selectedTicket?.id === ticketId) setSelectedTicket(response.data.ticket);
        } catch (error) {
            console.error('Failed to update ticket:', error);
        }
    };

    const handleEditMessageTimestamp = async (msgIdx, newTimestamp) => {
        if (!selectedTicket) return;
        const updatedMessages = [...selectedTicket.messages];
        updatedMessages[msgIdx].timestamp = new Date(newTimestamp).toISOString();
        try {
            const response = await axios.put(`${API_URL}/api/support/tickets/${selectedTicket.id}`, { messages: updatedMessages });
            setSelectedTicket(response.data.ticket);
            setSupportTickets(supportTickets.map(t => t.id === selectedTicket.id ? response.data.ticket : t));
            setEditingMessage(null);
        } catch (error) {
            console.error('Failed to update message:', error);
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setProductForm({ title: '', description: '', price: '', category: 'Consoles', image_url: '', stock: '' });
        setShowProductModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product.id);
        setProductForm({
            title: product.title,
            description: product.description || '',
            price: product.price.toString(),
            category: product.category || 'Consoles',
            image_url: product.image_url || '',
            stock: product.stock?.toString() || '0'
        });
        setShowProductModal(true);
    };

    const handleSaveProduct = async () => {
        try {
            if (editingProduct) {
                await axios.put(`${API_URL}/api/stripe/products/${editingProduct}`, productForm);
            } else {
                await axios.post(`${API_URL}/api/stripe/products`, productForm);
            }
            setShowProductModal(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_URL}/api/stripe/products/${productId}`);
                fetchProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    // Settings state
    const [settings, setSettings] = useState({
        phone: '+447782260144',
        email: 'support@old-arcade.com',
        address: '7 Llewellyn Close, Stourport-On-Severn, England, DY13 9RH',
        aboutUs: 'Your premium destination for retro gaming excellence. Authorized Amazon seller and official gaming distributor. Discover legendary consoles, timeless games, and elite accessories from Retro Arcade Co LTD.',
        facebook: 'https://facebook.com/oldarcade',
        twitter: 'https://twitter.com/oldarcade',
        instagram: 'https://instagram.com/oldarcade',
        youtube: 'https://youtube.com/oldarcade',
    });

    const [saved, setSaved] = useState(false);

    // Stats data - computed from real orders
    const stats = {
        orders: orders.length,
        revenue: orders.reduce((sum, order) => sum + (order.total_amount || 0), 0),
        users: 850,
        queries: 12
    };

    // Status options for dropdown
    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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
        // Dispatch custom event to update Footer immediately
        window.dispatchEvent(new Event('settingsUpdated'));
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
                        { id: 'products', icon: Package, label: 'Products' },
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
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Recent Orders</h3>
                                    <button onClick={fetchOrders} className="p-2 rounded-lg hover:bg-primary/10 transition-colors" style={{ color: '#a855f7' }}>
                                        <RefreshCw size={18} className={ordersLoading ? 'animate-spin' : ''} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {ordersLoading ? (
                                        <div className="flex justify-center py-8">
                                            <Loader2 size={24} className="animate-spin text-primary" />
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <p className="text-center py-8" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No orders yet</p>
                                    ) : (
                                        orders.slice(0, 5).map(order => (
                                            <div key={order.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc' }}>
                                                <div>
                                                    <div className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{order.order_number}</div>
                                                    <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.customer_name}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>£{order.total_amount?.toFixed(2)}</div>
                                                    <div className="text-sm" style={{ 
                                                        color: order.status === 'Delivered' ? '#22c55e' : order.status === 'Shipped' ? '#3b82f6' : '#eab308' 
                                                    }}>{order.status}</div>
                                                </div>
                                            </div>
                                        ))
                                    )}
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

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Products</h1>
                            <div className="flex gap-3">
                                <button onClick={fetchProducts} className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: isDark ? '#1a1a2e' : '#e2e8f0', color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    <RefreshCw size={18} className={productsLoading ? 'animate-spin' : ''} />
                                </button>
                                <button onClick={handleAddProduct} className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#a855f7', color: '#ffffff' }}>
                                    <Plus size={18} />
                                    Add Product
                                </button>
                            </div>
                        </div>
                        
                        {productsLoading ? (
                            <div className="flex justify-center py-16">
                                <Loader2 size={32} className="animate-spin text-primary" />
                            </div>
                        ) : productsData.length === 0 ? (
                            <div className="rounded-xl p-12 text-center" style={cardStyle}>
                                <Package size={48} className="mx-auto mb-4 opacity-50" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No products yet. Click "Add Product" to create your first product.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {productsData.map(product => (
                                    <div key={product.id} className="rounded-xl overflow-hidden" style={cardStyle}>
                                        <div className="h-40 bg-cover bg-center" style={{ 
                                            backgroundImage: product.image_url ? `url(${product.image_url})` : 'none',
                                            backgroundColor: isDark ? '#0a0a0f' : '#e2e8f0'
                                        }}>
                                            {!product.image_url && (
                                                <div className="h-full flex items-center justify-center">
                                                    <Image size={48} style={{ color: isDark ? '#3a3a4a' : '#cbd5e1' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{product.title}</h3>
                                                <span className="text-lg font-bold" style={{ color: '#a855f7' }}>£{product.price?.toFixed(2)}</span>
                                            </div>
                                            <p className="text-sm mb-3 line-clamp-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{product.description}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: isDark ? '#1a1a2e' : '#e2e8f0', color: isDark ? '#8b8b9e' : '#64748b' }}>{product.category}</span>
                                                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: isDark ? '#1a1a2e' : '#e2e8f0', color: isDark ? '#8b8b9e' : '#64748b' }}>Stock: {product.stock}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditProduct(product)} className="p-2 rounded-lg hover:bg-primary/10 transition-colors" style={{ color: '#a855f7' }}>
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeleteProduct(product.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color: '#ef4444' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Ultra Premium Product Modal */}
                {showProductModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
                        <div 
                            className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
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
                                className="px-8 py-6 flex items-center justify-between"
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
                                        <Sparkles size={24} color="white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                                        </h2>
                                        <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                            Retro Arcade Co LTD - Premium Inventory
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowProductModal(false)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                                >
                                    <X size={20} style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                {/* Image Upload Section */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                        Product Image
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Image Preview */}
                                        <div 
                                            className="aspect-square rounded-xl overflow-hidden flex items-center justify-center"
                                            style={{ 
                                                backgroundColor: isDark ? '#0a0a0f' : '#e2e8f0',
                                                border: `2px dashed ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.4)'}`
                                            }}
                                        >
                                            {productForm.image_url ? (
                                                <img 
                                                    src={productForm.image_url} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <Image size={48} style={{ color: isDark ? '#3a3a4a' : '#94a3b8', margin: '0 auto 8px' }} />
                                                    <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No image</p>
                                                </div>
                                            )}
                                        </div>
                                        {/* Upload Options */}
                                        <div className="space-y-3">
                                            <label 
                                                htmlFor="product-image-upload"
                                                className="block p-4 rounded-xl text-center cursor-pointer transition-all hover:scale-[1.02]"
                                                style={{ 
                                                    backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.1)',
                                                    border: `1px solid ${isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.3)'}`
                                                }}
                                            >
                                                <Upload size={24} style={{ color: '#a855f7', margin: '0 auto 8px' }} />
                                                <p className="text-sm font-medium" style={{ color: '#a855f7' }}>Upload Image</p>
                                                <p className="text-xs mt-1" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>PNG, JPG up to 5MB</p>
                                            </label>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setProductForm({...productForm, image_url: reader.result});
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                id="product-image-upload"
                                            />
                                            <input
                                                type="text"
                                                value={productForm.image_url}
                                                onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                                style={inputStyle}
                                                placeholder="Or paste image URL..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            Product Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={productForm.title}
                                            onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-primary/50"
                                            style={inputStyle}
                                            placeholder="Enter product title"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            Description
                                        </label>
                                        <textarea
                                            value={productForm.description}
                                            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl resize-none transition-all focus:ring-2 focus:ring-primary/50"
                                            style={inputStyle}
                                            rows={3}
                                            placeholder="Describe your product..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            Price (£) *
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold" style={{ color: '#a855f7' }}>£</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={productForm.price}
                                                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-primary/50"
                                                style={inputStyle}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            Stock Quantity
                                        </label>
                                        <input
                                            type="number"
                                            value={productForm.stock}
                                            onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-primary/50"
                                            style={inputStyle}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                            Category
                                        </label>
                                        <select
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-primary/50"
                                            style={inputStyle}
                                        >
                                            {productCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div 
                                className="px-8 py-5 flex gap-4"
                                style={{ 
                                    backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)',
                                    borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
                                }}
                            >
                                <button
                                    onClick={() => setShowProductModal(false)}
                                    className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                                    style={{ 
                                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                                        color: isDark ? '#ffffff' : '#0a0a0f' 
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProduct}
                                    className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #a855f7, #22d3ee)', 
                                        color: '#ffffff',
                                        boxShadow: '0 4px 15px rgba(168,85,247,0.4)'
                                    }}
                                >
                                    <Sparkles size={18} />
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Orders</h1>
                            <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#a855f7', color: '#ffffff' }}>
                                <RefreshCw size={18} className={ordersLoading ? 'animate-spin' : ''} />
                                Refresh
                            </button>
                        </div>
                        
                        {ordersLoading ? (
                            <div className="flex justify-center py-16">
                                <Loader2 size={32} className="animate-spin text-primary" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="rounded-xl p-12 text-center" style={cardStyle}>
                                <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No orders yet. Orders will appear here after customers complete checkout.</p>
                            </div>
                        ) : (
                            <div className="rounded-xl overflow-hidden" style={cardStyle}>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8fafc' }}>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Order ID</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Customer</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Shipping Address</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Items</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Total</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Status</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Courier & Tracking</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Date</th>
                                                <th className="text-left p-4 font-semibold" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id} style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                                                    <td className="p-4 font-medium" style={{ color: '#a855f7' }}>{order.order_number}</td>
                                                    <td className="p-4">
                                                        <div style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{order.customer_name}</div>
                                                        <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.customer_email}</div>
                                                        {order.customer_phone && (
                                                            <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.customer_phone}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        {order.shipping_address ? (
                                                            <div className="text-sm max-w-[200px]" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                                                <div>{order.shipping_address.address1}</div>
                                                                {order.shipping_address.address2 && <div>{order.shipping_address.address2}</div>}
                                                                <div>{order.shipping_address.city}, {order.shipping_address.postcode}</div>
                                                                <div style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{order.shipping_address.country}</div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm opacity-50" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No address</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>{order.items?.length || 0}</td>
                                                    <td className="p-4 font-semibold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>£{order.total_amount?.toFixed(2)}</td>
                                                    <td className="p-4">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order, e.target.value)}
                                                            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
                                                            style={{
                                                                backgroundColor: order.status === 'Delivered' ? 'rgba(34,197,94,0.1)' : order.status === 'Shipped' ? 'rgba(59,130,246,0.1)' : order.status === 'Processing' ? 'rgba(234,179,8,0.1)' : order.status === 'Cancelled' ? 'rgba(239,68,68,0.1)' : 'rgba(168,85,247,0.1)',
                                                                color: order.status === 'Delivered' ? '#22c55e' : order.status === 'Shipped' ? '#3b82f6' : order.status === 'Processing' ? '#eab308' : order.status === 'Cancelled' ? '#ef4444' : '#a855f7',
                                                                border: 'none'
                                                            }}
                                                        >
                                                            {statusOptions.map(status => (
                                                                <option key={status} value={status}>{status}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="p-4">
                                                        {editingOrder === order.id ? (
                                                            <div className="space-y-2">
                                                                <select
                                                                    value={editForm.courier}
                                                                    onChange={(e) => setEditForm({...editForm, courier: e.target.value})}
                                                                    className="w-full px-2 py-1 rounded text-sm"
                                                                    style={inputStyle}
                                                                >
                                                                    <option value="">Select Courier</option>
                                                                    {courierOptions.map(c => (
                                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="text"
                                                                    value={editForm.tracking_id}
                                                                    onChange={(e) => setEditForm({...editForm, tracking_id: e.target.value.toUpperCase()})}
                                                                    placeholder="Tracking ID (auto-gen on ship)"
                                                                    className="w-full px-2 py-1 rounded text-sm"
                                                                    style={inputStyle}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="text-sm">
                                                                {order.courier && (
                                                                    <div className="flex items-center gap-1 mb-1">
                                                                        <Truck size={12} style={{ color: '#22d3ee' }} />
                                                                        <span style={{ color: isDark ? '#ffffff' : '#0a0a0f' }} className="capitalize">
                                                                            {courierOptions.find(c => c.id === order.courier)?.name || order.courier}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {order.tracking_id ? (
                                                                    <div className="flex items-center gap-1">
                                                                        <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.1)', color: '#a855f7' }}>
                                                                            {order.tracking_id}
                                                                        </code>
                                                                        <button onClick={() => copyToClipboard(order.tracking_id)} className="p-1 hover:bg-primary/10 rounded" title="Copy">
                                                                            <Copy size={12} style={{ color: '#a855f7' }} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <span className="opacity-50" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No tracking</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        {editingOrder === order.id ? (
                                                            <input
                                                                type="date"
                                                                value={editForm.order_date}
                                                                onChange={(e) => setEditForm({...editForm, order_date: e.target.value})}
                                                                className="px-2 py-1 rounded text-sm"
                                                                style={inputStyle}
                                                            />
                                                        ) : (
                                                            <span style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                                                {new Date(order.created_at).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        {editingOrder === order.id ? (
                                                            <div className="flex items-center gap-2">
                                                                <button onClick={() => handleSaveOrder(order.id)} className="p-2 rounded-lg hover:bg-green-500/10 transition-colors" style={{ color: '#22c55e' }}>
                                                                    <Check size={18} />
                                                                </button>
                                                                <button onClick={handleCancelEdit} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color: '#ef4444' }}>
                                                                    <XCircle size={18} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => handleEditOrder(order)} className="p-2 rounded-lg hover:bg-primary/10 transition-colors" style={{ color: '#a855f7' }}>
                                                                <Edit2 size={18} />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Queries Tab - Support Tickets */}
                {activeTab === 'queries' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Support Tickets</h1>
                            <button onClick={fetchTickets} className="px-4 py-2 rounded-lg font-medium flex items-center gap-2" style={{ backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.1)', color: '#a855f7' }}>
                                <RefreshCw size={16} /> Refresh
                            </button>
                        </div>
                        
                        <div className="flex gap-6" style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}>
                            {/* Tickets List */}
                            <div className="w-[35%] rounded-xl overflow-hidden flex flex-col" style={cardStyle}>
                                <div className="p-4 font-semibold" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`, color: isDark ? '#fff' : '#0a0a0f' }}>
                                    All Tickets ({supportTickets.length})
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {ticketsLoading ? (
                                        <div className="flex items-center justify-center py-12"><Loader2 size={24} className="animate-spin" style={{ color: '#a855f7' }} /></div>
                                    ) : supportTickets.length === 0 ? (
                                        <div className="text-center py-12"><MessageCircle size={40} className="mx-auto mb-3 opacity-30" /><p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No tickets</p></div>
                                    ) : supportTickets.map(ticket => (
                                        <button key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="w-full text-left p-4 transition-colors" style={{ backgroundColor: selectedTicket?.id === ticket.id ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.05)') : 'transparent', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className="font-medium truncate" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{ticket.subject}</h4>
                                                <span className="text-xs px-2 py-0.5 rounded-full capitalize shrink-0" style={{ backgroundColor: ticket.status === 'open' ? 'rgba(234,179,8,0.1)' : ticket.status === 'replied' ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)', color: ticket.status === 'open' ? '#eab308' : ticket.status === 'replied' ? '#22c55e' : '#6b7280' }}>{ticket.status}</span>
                                            </div>
                                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{ticket.name} • {ticket.email}</p>
                                            <p className="text-xs mt-1" style={{ color: isDark ? '#6b6b7e' : '#94a3b8' }}>{new Date(ticket.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="w-[65%] rounded-xl overflow-hidden flex flex-col" style={cardStyle}>
                                {selectedTicket ? (
                                    <>
                                        <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                                            <div>
                                                <h3 className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{selectedTicket.subject}</h3>
                                                <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{selectedTicket.name} • {selectedTicket.email}</p>
                                            </div>
                                            <select value={selectedTicket.status} onChange={(e) => handleUpdateTicketStatus(selectedTicket.id, e.target.value)} className="px-3 py-1.5 rounded-lg text-sm" style={inputStyle}>
                                                <option value="open">Open</option>
                                                <option value="replied">Replied</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                            {selectedTicket.messages.map((msg, idx) => (
                                                <div key={idx} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className="max-w-[80%] rounded-2xl px-4 py-3 relative group" style={{ backgroundColor: msg.sender === 'admin' ? '#a855f7' : (isDark ? '#1a1a2e' : '#f1f5f9'), color: msg.sender === 'admin' ? '#fff' : (isDark ? '#fff' : '#0a0a0f') }}>
                                                        <p className="text-sm">{msg.message}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {editingMessage === idx ? (
                                                                <input type="datetime-local" defaultValue={new Date(msg.timestamp).toISOString().slice(0, 16)} onBlur={(e) => handleEditMessageTimestamp(idx, e.target.value)} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: 'inherit' }} autoFocus />
                                                            ) : (
                                                                <p className="text-xs opacity-70 cursor-pointer hover:underline" onClick={() => setEditingMessage(idx)}>{new Date(msg.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {selectedTicket.status !== 'closed' && (
                                            <form onSubmit={handleAdminReply} className="p-4 flex gap-3" style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                                                <input type="text" value={adminReply} onChange={(e) => setAdminReply(e.target.value)} placeholder="Type your reply..." className="flex-1 px-4 py-3 rounded-xl" style={inputStyle} />
                                                <button type="submit" className="px-4 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}><Send size={20} /></button>
                                            </form>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center"><div className="text-center"><MessageCircle size={48} className="mx-auto mb-4 opacity-30" /><p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Select a ticket to view</p></div></div>
                                )}
                            </div>
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

                        {/* About Us */}
                        <div className="p-6 rounded-xl space-y-4" style={cardStyle}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>About Us</h2>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    Footer About Text
                                </label>
                                <textarea 
                                    value={settings.aboutUs} 
                                    onChange={(e) => setSettings({...settings, aboutUs: e.target.value})} 
                                    className="w-full px-4 py-3 rounded-lg resize-none" 
                                    style={inputStyle}
                                    rows={4}
                                    placeholder="Enter your about us text for the footer..."
                                />
                            </div>
                        </div>

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

            {/* Shipping Modal */}
            {showShippingModal && shippingModalOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md mx-4 rounded-2xl p-6" style={cardStyle}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>
                                <Truck size={24} color="white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Ship Order</h3>
                                <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{shippingModalOrder.order_number}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Courier *
                                </label>
                                <select
                                    value={shippingForm.courier}
                                    onChange={(e) => setShippingForm({...shippingForm, courier: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg"
                                    style={inputStyle}
                                >
                                    {courierOptions.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Tracking ID (auto-generated if empty)
                                </label>
                                <input
                                    type="text"
                                    value={shippingForm.tracking_id}
                                    onChange={(e) => setShippingForm({...shippingForm, tracking_id: e.target.value.toUpperCase()})}
                                    placeholder="Leave empty for auto-generate"
                                    className="w-full px-4 py-3 rounded-lg"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Shipment Date
                                </label>
                                <input
                                    type="date"
                                    value={shippingForm.shipped_date}
                                    onChange={(e) => setShippingForm({...shippingForm, shipped_date: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => { setShowShippingModal(false); setShippingModalOrder(null); }}
                                className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors"
                                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#0a0a0f' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleShippingSubmit}
                                className="flex-1 px-4 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                            >
                                <Truck size={18} />
                                Ship Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delivery Modal */}
            {showDeliveryModal && shippingModalOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md mx-4 rounded-2xl p-6" style={cardStyle}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                                <Check size={24} style={{ color: '#22c55e' }} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Mark as Delivered</h3>
                                <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{shippingModalOrder.order_number}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Delivery Date
                                </label>
                                <input
                                    type="date"
                                    value={deliveryForm.delivered_date}
                                    onChange={(e) => setDeliveryForm({...deliveryForm, delivered_date: e.target.value})}
                                    className="w-full px-4 py-3 rounded-lg"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => { setShowDeliveryModal(false); setShippingModalOrder(null); }}
                                className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors"
                                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#0a0a0f' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeliverySubmit}
                                className="flex-1 px-4 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                                style={{ backgroundColor: '#22c55e' }}
                            >
                                <Check size={18} />
                                Mark Delivered
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
