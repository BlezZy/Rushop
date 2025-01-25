"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/General/Button";
import UserPanel from "@/components/General/UserPanel";

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editAddress, setEditAddress] = useState({ street: "", city: "", country: "", zipCode: "" });
    const [error, setError] = useState(null);

    const fetchAddresses = async () => {
        try {
            const response = await fetch("http://localhost:4000/users/addresses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAddresses(data);
            } else {
                setError("Failed to fetch addresses.");
            }
        } catch (error) {
            setError("Error fetching addresses.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const formik = useFormik({
        initialValues: { street: "", city: "", country: "", zipCode: "" },
        validationSchema: Yup.object({
            street: Yup.string().required("Street is required").min(3, "Street must be at least 3 characters"),
            city: Yup.string().required("City is required").min(3, "City must be at least 3 characters"),
            country: Yup.string().required("Country is required").min(3, "Country must be at least 3 characters"),
            zipCode: Yup.string()
                .required("Zip Code is required")
                .length(5, "Zip Code must be exactly 5 digits")
                .matches(/^[0-9]+$/, "Zip Code must only contain digits"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch("http://localhost:4000/users/addresses", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    fetchAddresses();
                    setShowAddForm(false);
                    resetForm();
                } else {
                    setError("Failed to add address.");
                }
            } catch (error) {
                console.error("Error adding address:", error);
            }
        },
    });

    const handleEditAddress = async (index) => {
        const addressId = addresses[index]._id;

        try {
            const response = await fetch(`http://localhost:4000/users/addresses/${addressId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(editAddress),
            });

            if (response.ok) {
                fetchAddresses();
                setEditIndex(null);
                setEditAddress({ street: "", city: "", country: "", zipCode: "" });
            } else {
                setError("Failed to update address.");
            }
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };

    const handleRemoveAddress = async (index) => {
        const addressId = addresses[index]._id;

        try {
            const response = await fetch(`http://localhost:4000/users/addresses/${addressId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                fetchAddresses();
            } else {
                setError("Failed to remove address.");
            }
        } catch (error) {
            console.error("Error removing address:", error);
        }
    };

    const renderAddForm = () => (
        <div className="p-4 border rounded-lg bg-white shadow-md space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-darkPink">Add New Address</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                    {["street", "city", "country", "zipCode"].map((field) => (
                        <div key={field}>
                            <input
                                type="text"
                                name={field}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-darkPink ${
                                    formik.touched[field] && formik.errors[field] ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex space-x-4 mt-4">
                    <Button variant="primary" size="medium" type="submit">
                        Add Address
                    </Button>
                    <Button variant="secondary" size="medium" onClick={() => setShowAddForm(false)}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );

    const renderAddresses = () => (
        <ul className="space-y-4">
            {addresses.map((address, index) => (
                <li
                    key={index}
                    className="p-4 border rounded-lg bg-white shadow-md space-y-2"
                >
                    {editIndex === index ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="street"
                                value={editAddress.street}
                                onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })}
                                placeholder="Street"
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-darkPink"
                            />
                            <input
                                type="text"
                                name="city"
                                value={editAddress.city}
                                onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                                placeholder="City"
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-darkPink"
                            />
                            <input
                                type="text"
                                name="country"
                                value={editAddress.country}
                                onChange={(e) => setEditAddress({ ...editAddress, country: e.target.value })}
                                placeholder="Country"
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-darkPink"
                            />
                            <input
                                type="text"
                                name="zipCode"
                                value={editAddress.zipCode}
                                onChange={(e) => setEditAddress({ ...editAddress, zipCode: e.target.value })}
                                placeholder="Zip Code"
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-darkPink"
                            />
                            <div className="flex space-x-4">
                                <Button variant="primary" size="small" onClick={() => handleEditAddress(index)}>
                                    Save
                                </Button>
                                <Button variant="secondary" size="small" onClick={() => setEditIndex(null)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p><strong>Street:</strong> {address.street}</p>
                            <p><strong>City:</strong> {address.city}</p>
                            <p><strong>Country:</strong> {address.country}</p>
                            <p><strong>Zip Code:</strong> {address.zipCode}</p>
                            <div className="flex space-x-4">
                                <Button
                                    variant="primary"
                                    size="small"
                                    onClick={() => {
                                        setEditIndex(index);
                                        setEditAddress(address);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => handleRemoveAddress(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <UserPanel />
            <div className="w-full md:w-3/4 p-6">
                <div className="p-6 bg-lightPink rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-darkPink mb-4">Addresses</h2>
                    {renderAddresses()}
                    {!showAddForm ? (
                        <Button
                            variant="primary"
                            size="medium"
                            className="mt-6"
                            onClick={() => setShowAddForm(true)}
                        >
                            Add New Address
                        </Button>
                    ) : (
                        renderAddForm()
                    )}
                </div>
            </div>
        </div>
    );
}
