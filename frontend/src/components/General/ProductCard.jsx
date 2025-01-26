'use client';

import Button from '@/components/General/Button';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/products/${product._id}`);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <img
                src={`/products/${product.images[0]}`}
                alt={product.name}
                className="w-full h-72 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold text-center text-darkPink">{product.name}</h3>
            <p className="text-md text-gray-600 text-center mb-2">{product.producer}</p>
            <p className="text-lg text-darkPink font-semibold mb-4">${product.price.toFixed(2)}</p>
            <Button variant="primary" size="medium" onClick={handleViewDetails}>
                View Details
            </Button>
        </div>
    );
}
