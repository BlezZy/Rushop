'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/General/ProductCard';
import Button from '@/components/General/Button';

export default function SearchResults() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const categoryId = searchParams.get('category');
            const title = searchParams.get('title');
            const minPrice = searchParams.get('minPrice');
            const maxPrice = searchParams.get('maxPrice');

            let endpoint = 'http://localhost:4000/api/products/search';
            const queryParams = [];

            if (categoryId) queryParams.push(`category=${categoryId}`);
            if (title) queryParams.push(`title=${encodeURIComponent(title)}`);
            if (minPrice) queryParams.push(`minPrice=${minPrice}`);
            if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);

            if (queryParams.length > 0) endpoint += `?${queryParams.join('&')}`;

            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch products.');
                }
                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]);

    const handleClearFilters = () => {
        router.push('/');
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-darkPink">Search Results</h1>
                <Button variant="secondary" size="medium" onClick={handleClearFilters}>
                    Clear Filters
                </Button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && products.length === 0 && <p>No products found.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    );
}
