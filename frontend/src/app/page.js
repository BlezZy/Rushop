'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/General/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setError(null);
            } else {
                setError('Failed to fetch products.');
            }
        } catch (err) {
            setError('An error occurred while fetching products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="p-8">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}
