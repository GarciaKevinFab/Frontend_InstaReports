import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../contexts/AuthContext';
import styles from '../styles/components/Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { RiUserLine, RiLogoutBoxLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
    const { user, handleLogout } = useAuthContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 150, damping: 20 }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.1, rotate: 5 },
        tap: { scale: 0.95 }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.4, ease: 'easeInOut' }
        }
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    const menuItems = user
        ? [
            { text: 'Home', href: '/' },
            { text: 'Profile', href: '/profile' },
            { text: 'Logout', action: () => handleLogout() }
        ]
        : [{ text: 'Home', href: '/' }];

    return (
        <motion.nav
            className={styles.navbar}
            variants={navVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.logo}>
                <motion.div
                    whileHover={{ scale: 1.05, color: '#ff7f50' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <Link href="/">InstaReports</Link>
                </motion.div>
            </div>

            <div className={styles.desktopMenu}>
                {user && (
                    <motion.div
                        className={styles.userInfo}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <span className={styles.userName}>
                            <RiUserLine size={20} style={{ marginRight: '5px' }} /> {user.name}
                        </span>
                        <motion.button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <RiLogoutBoxLine size={20} style={{ marginRight: '5px' }} /> Logout
                        </motion.button>
                    </motion.div>
                )}
            </div>

            <motion.div
                className={styles.mobileToggle}
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isMobileMenuOpen ? <RiCloseLine size={30} /> : <RiMenuLine size={30} />}
            </motion.div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.text}
                                custom={index}
                                variants={mobileItemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {item.href ? (
                                    <Link href={item.href}>
                                        <span onClick={() => setIsMobileMenuOpen(false)}>{item.text}</span>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            item.action();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {item.text}
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;