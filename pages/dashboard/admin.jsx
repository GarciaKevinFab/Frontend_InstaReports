import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Statistics from '../../components/Statistics';
import Users from '../../components/Users';
import Reports from '../../components/Reports';
import styles from '../../styles/components/AdminDashboard.module.css';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('statistics'); // Estadísticas por defecto

    const renderSection = () => {
        switch (activeSection) {
            case 'statistics':
                return <Statistics />;
            case 'users':
                return <Users />;
            case 'reports':
                return <Reports />;
            default:
                return <h2>Welcome to the Admin Dashboard</h2>;
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.dashboard}>
                <Sidebar setActiveSection={setActiveSection} />
                <div className={styles.content}>{renderSection()}</div>
            </div>
        </>
    );
};

export default AdminDashboard;
