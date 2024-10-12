import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./TaskCard.module.css";

export default function TaskCard({
    task,
    deleteTask,
    updateTaskStatus,
    editTaskTitle,
    editTaskDescription,
}) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [selectedStatus, setSelectedStatus] = useState(task.status);

    // Handle title changes
    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleSubmit = () => {
        if (editedTitle.trim() !== "") {
            editTaskTitle(task.id, editedTitle);
            setIsEditingTitle(false);
        }
    };

    // Handle description changes
    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleDescriptionSubmit = () => {
        if (editedDescription.trim() !== "") {
            editTaskDescription(task.id, editedDescription);
            setIsEditingDescription(false);
        }
    };

    // Handle status changes
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        updateTaskStatus(task.id, newStatus);
    };

    return (
        <motion.div
            className={styles.taskContainer}
            initial={false}
            animate={{ opacity: 1, transform: "none" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <li className={styles.taskItem}>
                <div className={styles.taskContent}>
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            onBlur={handleTitleSubmit}
                            autoFocus
                        />
                    ) : (
                        <div className={styles.taskHeader}>
                            <h3
                                className={`${styles.taskText} ${task.status === "Finished" ? styles.completed : ""
                                    }`}
                                onDoubleClick={() => setIsEditingTitle(true)}
                            >
                                {task.title}
                            </h3>
                            <EditIcon
                                className={styles.editBtn}
                                onClick={() => setIsEditingTitle(true)}
                            />
                        </div>
                    )}

                    {isEditingDescription ? (
                        <input
                            type="text"
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionSubmit}
                            autoFocus
                        />
                    ) : (
                        <div className={styles.taskDescriptionContainer}>
                            <p
                                className={`${styles.taskDescription} ${task.status === "Finished" ? styles.completed : ""
                                    }`}
                                onDoubleClick={() => setIsEditingDescription(true)}
                            >
                                {task.description}
                            </p>
                            <EditIcon
                                className={styles.editBtn}
                                onClick={() => setIsEditingDescription(true)}
                            />
                        </div>
                    )}
                </div>
            </li>
            <div className={styles.btnSection}>
                <Chip
                    color={
                        task.status === "Finished"
                            ? "success"
                            : task.status === "In Progress"
                                ? "warning"
                                : "error"
                    }
                    label={selectedStatus}
                    className={styles.statusChip}
                />
                <select
                    className={styles.statusSelect}
                    value={selectedStatus}
                    onChange={handleStatusChange}
                >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Finished">Finished</option>
                </select>
                <DeleteForeverIcon
                    className={styles.deleteBtnTask}
                    onClick={() => deleteTask(task.id)}
                />
            </div>
        </motion.div>
    );
}
