'use client';
import Button from '@/components/General/Button';

export default function ProductCard({ product }) {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <img
                src={`/products/${product.images[0]}`}
                alt={product.name}
                className="w-full h-96 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold text-center text-darkPink">{product.name}</h3>
            <p className="text-sm text-gray-600 text-center mb-2">{product.producer}</p>
            <p className="text-md text-darkPink font-semibold mb-4">${product.price.toFixed(2)}</p>
            <Button variant="primary" size="medium">
                View Details
            </Button>
        </div>
    );
}
