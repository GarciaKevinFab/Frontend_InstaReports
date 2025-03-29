import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { RiDashboardLine, RiFileList2Line, RiArrowLeftSLine } from 'react-icons/ri';
import styles from '../styles/components/Sidebar.module.css';

const TechSidebar = ({ onToggle }) => {
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter();

    const sidebarVariants = {
        hidden: {
            x: -260,
            opacity: 0,
            transition: { type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }
        }
    };

    const toggleButtonVariants = {
        hidden: { x: -244 },
        visible: { x: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
        hover: { scale: 1.1, rotate: 10 },
        tap: { scale: 0.9 }
    };

    const menuItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, type: 'spring', stiffness: 200 }
        })
    };

    const menuItems = [
        { icon: <RiDashboardLine size={20} />, text: 'Dashboard', path: '/dashboard/technician' },
        { icon: <RiFileList2Line size={20} />, text: 'Reports', path: '/tech/reports' },
        { icon: <RiFileList2Line size={20} />, text: 'More Features', action: () => alert('Feature Coming Soon!') }
    ];

    const handleNavigation = (item) => {
        console.log('handleNavigation called for:', item.text, item.path);
        if (typeof window === 'undefined') return;
        if (item.path) {
            try {
                router.push(item.path);
                console.log('Navigated to:', item.path);
                setIsVisible(false);
            } catch (error) {
                console.error('Navigation error:', error);
            }
        } else if (item.action) {
            item.action();
        }
    };

    const handleToggle = () => {
        setIsVisible(prev => !prev);
        if (onToggle) {
            onToggle(!isVisible); // Pasamos el nuevo estado al layout
        }
    };

    return (
        <div className={styles.sidebarContainer}>
            <motion.button
                className={styles.toggleButton}
                onClick={handleToggle}
                variants={toggleButtonVariants}
                initial="visible"
                animate={isVisible ? 'visible' : 'hidden'}
                whileHover="hover"
                whileTap="tap"
            >
                <RiArrowLeftSLine size={24} className={!isVisible ? styles.rotatedIcon : ''} />
            </motion.button>

            <motion.div
                className={styles.sidebar}
                variants={sidebarVariants}
                initial="visible"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                <ul className={styles.menu}>
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item.text}
                            custom={index}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className={styles.menuItem}
                            onClick={() => {
                                console.log('Menu item clicked:', item.text);
                                handleNavigation(item);
                            }}
                        >
                            <span>
                                {item.icon}
                                {item.text}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default TechSidebar;