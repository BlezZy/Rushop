'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/General/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [userId, setUserId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    setUserId(decodedToken.id);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }

                const productResponse = await fetch(`http://localhost:4000/api/products/${id}`);
                if (!productResponse.ok) throw new Error('Failed to fetch product details.');
                const productData = await productResponse.json();
                setProduct(productData);

                const reviewResponse = await fetch(`http://localhost:4000/api/reviews?productId=${id}`);
                if (reviewResponse.ok) {
                    const reviewData = await reviewResponse.json();
                    setReviews(reviewData.reviews || []);
                    setAverageRating(reviewData.averageRating || 0);
                } else {
                    setReviews([]);
                    setAverageRating(0);
                }
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/carts/cart/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId: id, quantity }),
            });

            if (!response.ok) throw new Error('Failed to add to cart.');

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        } catch (err) {
            console.error('Error adding product to cart:', err);
            alert('Failed to add product to cart.');
        }
    };

    const handleQuantityChange = (type) => {
        setQuantity((prev) => {
            if (type === 'increment') return prev + 1;
            if (type === 'decrement' && prev > 1) return prev - 1;
            return prev;
        });
    };

    const handleAddReview = async (values, { resetForm }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    productId: id,
                    ...values,
                }),
            });

            if (response.ok) {
                const updatedReviews = await fetch(`http://localhost:4000/api/reviews?productId=${id}`);
                const updatedData = await updatedReviews.json();
                setReviews(updatedData.reviews || []);
                setAverageRating(updatedData.averageRating || 0);
                resetForm();
                setShowReviewForm(false);
            } else {
                const errorData = await response.json();
                console.error('Failed to add review:', errorData);
            }
        } catch (err) {
            console.error('Error adding review:', err);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const updatedReviews = await fetch(`http://localhost:4000/api/reviews?productId=${id}`);
                const updatedData = await updatedReviews.json();
                setReviews(updatedData.reviews || []);
                setAverageRating(updatedData.averageRating || 0);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'An unknown error occurred.');
            }
        } catch (err) {
            console.error('Error deleting review:', err);
            alert('An error occurred while deleting the review. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {showPopup && (
                <div className="fixed top-16 right-16 bg-darkPink text-white p-4 rounded-lg shadow-lg flex items-center space-x-4 z-50 animate-slideIn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="font-semibold">Product successfully added to cart!</p>
                </div>
            )}
            {product && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img
                            src={`/products/${product.images[0]}`}
                            alt={product.name}
                            className="w-full h-[800px] object-cover rounded-lg"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-darkPink mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                            <p className="text-lg text-darkPink font-semibold mb-4">${product.price.toFixed(2)}</p>
                            <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
                            <p className="text-gray-600 mb-4">Average Rating: {averageRating} / 5</p>
                            <div className="flex items-center mb-4">
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => handleQuantityChange('decrement')}
                                >
                                    -
                                </Button>
                                <p className="mx-4">{quantity}</p>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => handleQuantityChange('increment')}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                variant="primary"
                                size="medium"
                                onClick={handleAddToCart}
                                disabled={!isLoggedIn}
                            >
                                {isLoggedIn ? 'Add to Cart' : 'Login to Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-darkPink">Reviews</h2>
                    <Button
                        variant="primary"
                        size="medium"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                    >
                        {showReviewForm ? 'Cancel' : 'Add Review'}
                    </Button>
                </div>

                {showReviewForm && (
                    <Formik
                        initialValues={{ rating: '', comment: '' }}
                        validationSchema={Yup.object({
                            rating: Yup.number()
                                .required('Rating is required')
                                .min(1, 'Rating must be at least 1')
                                .max(5, 'Rating must be at most 5'),
                            comment: Yup.string()
                                .required('Comment is required')
                                .min(5, 'Comment must be at least 5 characters')
                                .max(128, 'Comment must be at most 128 characters'),
                        })}
                        onSubmit={handleAddReview}
                    >
                        {({ isSubmitting }) => (
                            <Form className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                                <div className="space-y-4">
                                    <Field
                                        as="select"
                                        name="rating"
                                        className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-darkPink"
                                    >
                                        <option value="">Select Rating</option>
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <option key={value} value={value}>
                                                {value} Star{value > 1 && 's'}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="rating" component="p" className="text-red-500 text-sm" />
                                    <Field
                                        as="textarea"
                                        name="comment"
                                        placeholder="Write your review..."
                                        className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-darkPink"
                                    />
                                    <ErrorMessage name="comment" component="p" className="text-red-500 text-sm" />
                                    <Button variant="primary" size="medium" type="submit" disabled={isSubmitting}>
                                        Submit Review
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}

                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {reviews.map((review) => (
                            <li
                                key={review._id}
                                className="p-4 border rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold text-gray-800">
                                        {review.userId?.firstName} {review.userId?.lastName}
                                    </p>
                                    <p className="font-bold text-gray-800">Rating: {review.rating} / 5</p>
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                                {review.userId?._id === userId && (
                                    <Button
                                        variant="primary"
                                        size="small"
                                        onClick={() => handleDeleteReview(review._id)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
