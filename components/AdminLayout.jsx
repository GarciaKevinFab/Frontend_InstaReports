// components/AdminLayout.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import styles from '../styles/components/AdminDashboard.module.css';

const AdminLayout = ({ children }) => {
    const router = useRouter();
    const { user, loading } = useAuthContext();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    // Redirigir a /login si el usuario no está autenticado
    useEffect(() => {
        if (loading) return;

        console.log('User state:', user);
        if (user === null) {
            console.log('Redirecting to /login because user is null');
            router.push('/login');
        } else if (user.role !== 'admin') {
            console.log('Redirecting to /dashboard/technician because user is not an admin');
            router.push('/dashboard/technician');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    const contentVariants = {
        visible: {
            marginLeft: 260,
            transition: { type: 'spring', stiffness: 200, damping: 25 }
        },
        hidden: {
            marginLeft: 0,
            transition: { type: 'spring', stiffness: 200, damping: 25 }
        }
    };

    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.mainContainer}>
                <Sidebar onToggle={setIsSidebarVisible} />
                <motion.div
                    className={styles.content}
                    variants={contentVariants}
                    animate={isSidebarVisible ? 'visible' : 'hidden'}
                >
                    {children}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;