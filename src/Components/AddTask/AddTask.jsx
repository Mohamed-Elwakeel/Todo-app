import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import styles from "./AddTask.module.css";

export default function AddTask({ onSubmit }) {

    const formik = useFormik({
        initialValues: {
            taskTitle: "",
            taskDescription: "",
        },
        validationSchema: yup.object({
            taskTitle: yup
                .string("Enter your task title")
                .trim()
                .min(3, "Must be more than 3 characters")
                .required("Required"),
            taskDescription: yup
                .string("Enter your task description")
                .trim()
                .min(3, "Must be more than 3 letters")
                .required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            onSubmit(values.taskTitle, values.taskDescription);
            setSubmitting(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={styles.addTaskContainer}>
            <label className={styles.taskInputLabel} htmlFor="new-task">
                Add new task
            </label>
            <input
                className={styles.taskInput}
                type="text"
                id="new-task"
                placeholder="Task title"
                {...formik.getFieldProps("taskTitle")}
            />
            {formik.touched.taskTitle && formik.errors.taskTitle ? (
                <div className={styles.formikError}>{formik.errors.taskTitle}</div>
            ) : null}

            <label className={styles.taskInputLabel} htmlFor="task-description">
                Add task description
            </label>
            <input
                className={styles.taskInput}
                type="text"
                id="task-description"
                placeholder="Task description"
                {...formik.getFieldProps("taskDescription")}
            />
            {formik.touched.taskDescription && formik.errors.taskDescription ? (
                <div className={styles.formikError}>{formik.errors.taskDescription}</div>
            ) : null}

            <button className={styles.addTaskBtn}>Add</button>
        </form>
    );
};
