"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/General/Button";

export default function LoginForm() {
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch("http://localhost:4000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || "Login failed.");
                    return;
                }

                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.href = "/";
            } catch (error) {
                setError("An error occurred. Please try again.");
            }
        },
    });

    return (
        <div className="flex items-center justify-center bg-gray-100 p-24">
            <form
                onSubmit={formik.handleSubmit}
                className="w-1/2 bg-lightPink p-12 rounded-card shadow-card flex flex-col justify-center items-center space-y-6"
            >
                <h1 className="text-4xl py-4 font-primary text-darkPink text-center">
                    Welcome Back
                </h1>
                <p className="text-gray-600 text-sm text-center py-2">
                    Please log in to continue to your account.
                </p>
                <div className="space-y-4 w-full">
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
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-3 border ${
                                formik.touched.password && formik.errors.password
                                    ? "border-red-500"
                                    : "border-gray"
                            } rounded-card focus:outline-none focus:ring-2 focus:ring-darkPink text-sm`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button variant="primary" size="small">
                        Login
                    </Button>
                </div>
                {error && (
                    <p className="text-red-500 text-sm text-center mt-2">
                        {error}
                    </p>
                )}
                <p className="text-sm text-center text-gray-600">
                    Don&#39;t have an account?{" "}
                    <a
                        href="/register"
                        className="text-darkPink hover:underline"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
