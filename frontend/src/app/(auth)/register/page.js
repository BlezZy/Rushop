"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/General/Button";

export default function Register() {
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
            street: "",
            city: "",
            country: "",
            zipCode: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(3, "Name must be at least 3 characters"),
            surname: Yup.string()
                .required("Surname is required")
                .min(3, "Surname must be at least 3 characters"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Please confirm your password"),
            street: Yup.string()
                .required("Street is required")
                .min(3, "Street must be at least 3 characters"),
            city: Yup.string()
                .required("City is required")
                .min(3, "City must be at least 3 characters"),
            country: Yup.string()
                .required("Country is required")
                .min(3, "Country must be at least 3 characters"),
            zipCode: Yup.string()
                .required("Zip Code is required")
                .length(5, "Zip Code must be exactly 5 digits")
                .matches(/^[0-9]+$/, "Zip Code must only contain digits"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await fetch("http://localhost:4000/users/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: values.name,
                        surname: values.surname,
                        email: values.email,
                        password: values.password,
                        addresses: [
                            {
                                street: values.street,
                                city: values.city,
                                country: values.country,
                                zipCode: values.zipCode,
                            },
                        ],
                    }),
                });

                if (response.ok) {
                    window.location.href = "/login";
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || "Registration failed. Please try again.");
                }
            } catch (error) {
                setError("An error occurred. Please check your network connection.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="grid place-items-center bg-gray-100 p-24 min-h-screen">
            <form
                onSubmit={formik.handleSubmit}
                className="grid gap-6 w-full max-w-3xl bg-lightPink p-12 rounded-card shadow-card"
            >
                <div className="text-center">
                    <h1 className="text-4xl py-4 font-primary text-darkPink">
                        Create Account
                    </h1>
                    <p className="text-gray-600 text-sm py-2">
                        Please fill in the form to create your account.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {["name", "surname"].map((field) => (
                        <div key={field}>
                            <input
                                type="text"
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full px-4 py-3 border ${
                                    formik.touched[field] && formik.errors[field]
                                        ? "border-red-500"
                                        : "border-gray"
                                } rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm`}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Pole Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border ${
                            formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray"
                        } rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                </div>

                {/* Password i Confirm Password obok siebie */}
                <div className="grid gap-4 md:grid-cols-2">
                    {["password", "confirmPassword"].map((field) => (
                        <div key={field}>
                            <input
                                type="password"
                                name={field}
                                placeholder={
                                    field === "confirmPassword"
                                        ? "Confirm Password"
                                        : "Password"
                                }
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full px-4 py-3 border ${
                                    formik.touched[field] && formik.errors[field]
                                        ? "border-red-500"
                                        : "border-gray"
                                } rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm`}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {["street", "city", "country", "zipCode"].map((field) => (
                        <div key={field}>
                            <input
                                type="text"
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full px-4 py-3 border ${
                                    formik.touched[field] && formik.errors[field]
                                        ? "border-red-500"
                                        : "border-gray"
                                } rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm`}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button variant="primary" size="small" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center mt-2">
                        {error}
                    </p>
                )}

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-darkPink hover:underline">
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}
