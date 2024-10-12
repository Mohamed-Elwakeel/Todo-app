import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './ToggleBtn.module.css';

export default function ToggleButton() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <button onClick={toggleTheme} className={styles.toggleButton}>
            {theme === 'light' ? (
                <FaMoon className={styles.icon} />
            ) : (
                <FaSun className={styles.icon} />
            )}
        </button>
    );
}
