import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const CheckoutSuccess = () => {
    const { isDark } = useTheme();
    const { clearCart } = useCart();
    const [searchParams] = useSearchParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');
    const isPaypal = searchParams.get('paypal') === 'true';
    const isCard = searchParams.get('card') === 'true';

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if ((isPaypal || isCard) && orderId) {
                    // PayPal or demo card order - fetch order details
                    const response = await axios.get(`${API_URL}/api/stripe/orders/${orderId}`);
                    if (response.data.success) {
                        setOrder(response.data.order);
                    } else {
                        setError('Order not found');
                    }
                } else if (sessionId) {
                    // Stripe payment - verify session
                    const response = await axios.get(`${API_URL}/api/stripe/verify-session/${sessionId}`);
                    if (response.data.success) {
                        setOrder(response.data.order);
                        clearCart();
                    } else {
                        setError('Payment verification failed');
                    }
                } else {
                    setError('No order information found');
                }
            } catch (err) {
                console.error('Verification error:', err);
                setError('Failed to verify order');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId, orderId, isPaypal, isCard, clearCart]);

    if (loading) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <Loader2 size={48} className="text-primary animate-spin mb-4" />
                <h2 className="text-2xl font-bold">Verifying your payment...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <Package size={32} className="text-red-500" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Something went wrong</h2>
                <p className={`mb-8 max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {error}. Please contact support if you were charged.
                </p>
                <Link to="/shop" className="btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-500" />
            </div>
            
            <h1 className="text-4xl font-display font-bold mb-4">
                Thank you for your <span className="text-primary">order!</span>
            </h1>
            
            <p className={`mb-8 max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {order?.payment_method === 'paypal' 
                    ? "Your PayPal payment was successful! We've received your order and will process it shortly."
                    : "Your payment was successful. We've received your order and will process it shortly."
                }
            </p>

            {order?.payment_method === 'paypal' && (
                <div className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-1.12 7.106a.339.339 0 0 0 .335.391h2.9c.436 0 .806-.317.875-.746l.798-5.063a.875.875 0 0 1 .87-.746h1.286c4.34 0 7.739-1.763 8.734-6.866.462-2.37.085-4.326-1.453-5.596z"/>
                    </svg>
                    <span className="text-sm font-medium">Paid with PayPal</span>
                </div>
            )}

            {order && (
                <div className={`w-full max-w-md rounded-xl p-6 mb-8 ${isDark ? 'bg-dark-lighter/50 border border-white/10' : 'bg-light-darker/50 border border-dark/10'}`}>
                    <h3 className="font-bold text-lg mb-4">Order Details</h3>
                    
                    <div className="space-y-3 text-left">
                        <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>Order Number</span>
                            <span className="font-medium text-primary">{order.order_number}</span>
                        </div>
                        <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>Email</span>
                            <span className="font-medium">{order.customer_email}</span>
                        </div>
                        <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>Total</span>
                            <span className="font-bold">£{order.total_amount?.toFixed(2)}</span>
                        </div>
                        <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>Status</span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    {order.items && order.items.length > 0 && (
                        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-dark/10'}`}>
                            <h4 className={`font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Items</h4>
                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span>{item.title} x{item.quantity}</span>
                                        <span>£{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="btn-primary flex items-center gap-2">
                    Continue Shopping
                    <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
