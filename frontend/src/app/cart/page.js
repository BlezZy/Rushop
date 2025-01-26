'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/General/Button';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const router = useRouter();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/carts/cart', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setCart({ items: [] });
                    } else {
                        throw new Error('Failed to fetch cart');
                    }
                } else {
                    const data = await response.json();
                    setCart(data);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load cart.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemoveItem = async (productId) => {
        try {
            const response = await fetch('http://localhost:4000/api/carts/cart/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) throw new Error('Failed to remove item');
            const updatedCart = await response.json();
            setCart(updatedCart.cart);
        } catch (err) {
            alert('Failed to remove item.');
        }
    };

    const handleClearCart = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/carts/cart', {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!response.ok) throw new Error('Failed to clear cart');
            const updatedCart = await response.json();
            setCart(updatedCart.cart);
        } catch (err) {
            alert('Failed to clear cart.');
        }
    };

    if (loading) {
        return <p className="text-center mt-8 text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-darkPink mb-6">Your Cart</h1>
            {cart.items.length > 0 ? (
                <>
                    <ul className="mb-6 space-y-4">
                        {cart.items.map((item, index) => {
                            const product = item.productId;
                            if (!product) {
                                return null;
                            }

                            const productImage =
                                product.images && product.images.length > 0
                                    ? `/products/${product.images[0]}`
                                    : '/default-image.jpg';

                            return (
                                <li
                                    key={`${product._id}-${index}`}
                                    className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={productImage}
                                            alt={product.name || 'Product Image'}
                                            className="w-20 h-28 object-cover mr-4 rounded-md"
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-darkPink">
                                                {product.name || 'Unknown Product'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Price: ${item.price} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="small"
                                        onClick={() => handleRemoveItem(product._id)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                        <p className="text-lg font-bold text-darkPink">
                            Total Price: $
                            {cart.items
                                .reduce((total, item) => total + item.price * item.quantity, 0)
                                .toFixed(2)}
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="secondary" size="medium" onClick={handleClearCart}>
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center p-8 bg-white shadow-md rounded-lg">
                    <p className="text-gray-600 mb-4">Your cart is empty.</p>
                    <Button variant="primary" size="medium" onClick={() => router.push('/')}>
                        Go Shopping
                    </Button>
                </div>
            )}
        </div>
    );
}
