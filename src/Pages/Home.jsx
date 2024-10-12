import React, { useEffect, useState } from 'react';
import TaskCard from '../Components/TaskCard/TaskCard';
import AddTask from '../Components/AddTask/AddTask';
import { AnimatePresence, motion } from "framer-motion";
import styles from './Home.module.css';
import ToggleButton from '../Components/ToggleBtn/ToggleBtn';

export default function HomePage() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('TASKS');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('TASKS', JSON.stringify(tasks));
    }, [tasks]);

    // Add a new task
    const handleAddTask = (title, description) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { id: crypto.randomUUID(), title, description, status: 'Not Started' },
        ]);
    };

    // Delete a task by ID
    const handleDeleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    // Update task status
    const handleStatusChange = (id, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    // Edit task title
    const handleEditTaskTitle = (id, newTitle) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    // Edit task description
    const handleEditTaskDescription = (id, newDescription) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, description: newDescription } : task
            )
        );
    };

    return (
        <div className={styles.appContainer}>
            <div className={styles.appHeader}>
                <h1 className={styles.appTitle}>Task Manager</h1>
                <ToggleButton />
            </div>
            <div className={styles.todoCard}>
                <AddTask onSubmit={handleAddTask} />
                <AnimatePresence>
                    <motion.div
                        className={styles.taskList}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {tasks.length === 0 ? (
                            <p>No tasks available</p>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    deleteTask={handleDeleteTask}
                                    updateTaskStatus={handleStatusChange}
                                    editTaskTitle={handleEditTaskTitle}
                                    editTaskDescription={handleEditTaskDescription}
                                />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className={styles.appInfo}>
                <h4>
                    <strong>Created with: </strong>
                    React JS, Material UI, and CSS3
                </h4>
                <h4>
                    <strong>Coded by: </strong> Mohamed Elwakeel
                </h4>
            </div>
        </div>
    );
}
