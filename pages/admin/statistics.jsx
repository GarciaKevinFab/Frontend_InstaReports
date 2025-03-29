import { useEffect, useState } from 'react';
import { getUsers } from '../../services/userService';
import { getReports } from '../../services/reportService';
import { motion } from 'framer-motion';
import { RiUserLine, RiFileList2Line } from 'react-icons/ri';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/pages/Statistics.module.css';

const Statistics = () => {
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                const reportsData = await getReports();
                setUsers(usersData);
                setReports(reportsData);
            } catch (err) {
                setError('Error fetching data');
            }
        };
        fetchData();
    }, []);

    return (
        <AdminLayout>
            <motion.div
                className={styles.statistics}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Dashboard Statistics</h1>
                {error && (
                    <motion.p
                        className={styles.error}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.p>
                )}
                <div className={styles.statCards}>
                    <motion.div
                        className={styles.statCard}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3>
                            <RiUserLine size={24} style={{ marginRight: '8px' }} />
                            Total Users
                        </h3>
                        <p>{users.length}</p>
                    </motion.div>
                    <motion.div
                        className={styles.statCard}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3>
                            <RiFileList2Line size={24} style={{ marginRight: '8px' }} />
                            Total Reports
                        </h3>
                        <p>{reports.length}</p>
                    </motion.div>
                </div>
            </motion.div>
        </AdminLayout>
    );
};

export default Statistics;