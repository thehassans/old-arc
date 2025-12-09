import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Minus, ArrowRight, Loader2, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

// PayPal Sandbox Client ID for testing
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'paypal'
    const [paypalLoaded, setPaypalLoaded] = useState(false);
    const paypalRef = useRef(null);

    const subtotal = getCartTotal();
    const shipping = subtotal > 80 ? 0 : 12;
    const total = subtotal + shipping;

    // Load PayPal SDK
    useEffect(() => {
        if (paymentMethod === 'paypal' && !paypalLoaded && cartItems.length > 0) {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=GBP`;
            script.async = true;
            script.onload = () => setPaypalLoaded(true);
            document.body.appendChild(script);
            
            return () => {
                // Cleanup if needed
            };
        }
    }, [paymentMethod, paypalLoaded, cartItems.length]);

    // Render PayPal buttons when SDK is loaded
    useEffect(() => {
        if (paypalLoaded && paymentMethod === 'paypal' && paypalRef.current && window.paypal) {
            paypalRef.current.innerHTML = '';
            
            window.paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal'
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total.toFixed(2),
                                currency_code: 'GBP'
                            },
                            description: `Old Arcade Order - ${cartItems.length} items`
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    setIsLoading(true);
                    try {
                        const details = await actions.order.capture();
                        
                        // Create order in our system
                        const response = await axios.post(`${API_URL}/api/stripe/create-paypal-order`, {
                            items: cartItems.map(item => ({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                quantity: item.quantity,
                                image_url: item.image_url
                            })),
                            paypal_order_id: details.id,
                            payer: details.payer,
                            total_amount: total
                        });

                        if (response.data.success) {
                            clearCart();
                            navigate(`/checkout/success?order_id=${response.data.order.id}&paypal=true`);
                        }
                    } catch (err) {
                        console.error('PayPal order error:', err);
                        setError('Failed to process PayPal payment');
                    } finally {
                        setIsLoading(false);
                    }
                },
                onError: (err) => {
                    console.error('PayPal error:', err);
                    setError('PayPal payment failed. Please try again.');
                }
            }).render(paypalRef.current);
        }
    }, [paypalLoaded, paymentMethod, total, cartItems, clearCart, navigate]);

    const handleCheckout = async () => {
        if (paymentMethod === 'paypal') {
            // PayPal handles its own checkout via buttons
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Stripe checkout
            const response = await axios.post(`${API_URL}/api/stripe/create-checkout-session`, {
                items: cartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image_url: item.image_url
                }))
            });

            // Handle demo order (when Stripe not configured)
            if (response.data.demoOrder && response.data.order) {
                clearCart();
                navigate(`/checkout/success?order_id=${response.data.order.id}&card=true`);
                return;
            }

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.error || 'Failed to place order. Please try again.');
            setIsLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h2>
                <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Looks like you haven't added any games yet.</p>
                <Link to="/shop" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-display font-bold mb-12">Shopping <span className="text-primary">Cart</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map(item => (
                        <div key={item.id} className={`rounded-xl p-6 flex gap-6 items-center ${isDark ? 'bg-dark-lighter/50 border border-white/10' : 'bg-light-darker/50 border border-dark/10'}`}>
                            <div className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ${isDark ? 'bg-dark' : 'bg-light'}`}>
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <p className="text-primary font-bold">£{item.price}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`flex items-center rounded-lg border ${isDark ? 'bg-dark border-white/10' : 'bg-light border-dark/10'}`}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-primary transition-colors"><Minus size={16} /></button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-primary transition-colors"><Plus size={16} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className={`p-2 hover:text-red-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className={`rounded-xl p-8 sticky top-24 ${isDark ? 'bg-dark-lighter/50 border border-white/10' : 'bg-light-darker/50 border border-dark/10'}`}>
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>Subtotal</span>
                                <span>£{subtotal.toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className={`border-t pt-4 flex justify-between font-bold text-lg ${isDark ? 'border-white/10' : 'border-dark/10'}`}>
                                <span>Total</span>
                                <span>£{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Payment Method</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                                        paymentMethod === 'card'
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : isDark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-dark/10 text-gray-600 hover:border-dark/20'
                                    }`}
                                >
                                    <CreditCard size={18} />
                                    <span className="text-sm font-medium">Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                                        paymentMethod === 'paypal'
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : isDark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-dark/10 text-gray-600 hover:border-dark/20'
                                    }`}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-1.12 7.106a.339.339 0 0 0 .335.391h2.9c.436 0 .806-.317.875-.746l.798-5.063a.875.875 0 0 1 .87-.746h1.286c4.34 0 7.739-1.763 8.734-6.866.462-2.37.085-4.326-1.453-5.596z"/>
                                    </svg>
                                    <span className="text-sm font-medium">PayPal</span>
                                </button>
                            </div>
                        </div>

                        {/* PayPal Buttons */}
                        {paymentMethod === 'paypal' && (
                            <div className="mb-6">
                                <div ref={paypalRef} className="min-h-[150px]">
                                    {!paypalLoaded && (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 size={24} className="animate-spin text-primary" />
                                            <span className="ml-2 text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Loading PayPal...</span>
                                        </div>
                                    )}
                                </div>
                                <p className={`mt-2 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    PayPal Sandbox Mode (Testing)
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                            <>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Checkout
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                                
                                <p className={`mt-4 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Stripe Test Card: 4242 4242 4242 4242
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
