import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Mock cart items
    const [cartItems, setCartItems] = useState([
        { id: 1, title: 'Retro Console X', price: 199.99, quantity: 1, image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80' },
        { id: 4, title: 'Game Cartridge Set', price: 89.99, quantity: 2, image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80' },
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added any games yet.</p>
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
                        <div key={item.id} className="bg-dark-lighter/50 border border-white/10 rounded-xl p-6 flex gap-6 items-center">
                            <div className="w-24 h-24 bg-dark rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <p className="text-primary font-bold">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-dark rounded-lg border border-white/10">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-primary transition-colors"><Minus size={16} /></button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-primary transition-colors"><Plus size={16} /></button>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-dark-lighter/50 border border-white/10 rounded-xl p-8 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg text-white">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full btn-primary flex items-center justify-center gap-2">
                            Proceed to Checkout
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
