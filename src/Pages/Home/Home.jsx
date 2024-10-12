import React, { useEffect, useState } from 'react';
import TaskCard from '../../Components/TaskCard/TaskCard';
import AddTask from '../../Components/AddTask/AddTask';
import { AnimatePresence, motion } from "framer-motion";
import styles from './Home.module.css';
import ToggleButton from '../../Components/ToggleBtn/ToggleBtn';

export default function HomePage() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('TASKS');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filter, setFilter] = useState("All");

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

    // Filter tasks based on selected status
    const filteredTasks = tasks.filter((task) => {
        if (filter === "All") return true; // Show all tasks
        return task.status === filter;
    });

    return (
        <div className={styles.appContainer}>
            <div className={styles.appHeader}>
                <h1 className={styles.appTitle}>Task Manager</h1>
                <ToggleButton />
            </div>

            <div className={styles.todoCard}>
                <AddTask onSubmit={handleAddTask} />

                <div className={styles.filterContainer}>
                    <label htmlFor="filter">Filter by Status:</label>
                    <select
                        id="filter"
                        className={styles.filterSelect}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>

                <AnimatePresence>
                    <motion.div
                        className={styles.taskList}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {filteredTasks.length === 0 ? (
                            <p>No tasks available</p>
                        ) : (
                            filteredTasks
                                .sort((a, b) => (a.status === "Finished" ? 1 : -1))
                                .map((task) => (
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
