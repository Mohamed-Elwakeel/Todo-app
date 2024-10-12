import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                localStorage.setItem("isAuthenticated", "true");
                alert("Login successful!");
                setSubmitting(false);
                navigate("/");
            }, 1000);
        },
    });

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginFormContainer}>
                    <h1>Welcome back!</h1>
                    <p>Enter your credentials to access your account.</p>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...formik.getFieldProps("email")}
                            className={formik.touched.email && formik.errors.email ? styles.errorInput : ""}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={styles.errorMessage}>{formik.errors.email}</div>
                        ) : null}

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...formik.getFieldProps("password")}
                            className={formik.touched.password && formik.errors.password ? styles.errorInput : ""}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={styles.errorMessage}>{formik.errors.password}</div>
                        ) : null}

                        <div className={styles.actions}>
                            <button className={styles.loginBtn} type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? "Logging in..." : "Log In"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className={styles.loginBackground}></div>
            </div>
        </div>
    );
}
