import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { getReports } from '../services/reportService';
import styles from '../styles/components/Statistics.module.css';

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
        <div className={styles.statistics}>
            <h1>Dashboard Statistics</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.statCards}>
                <div className={styles.statCard}>
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Reports</h3>
                    <p>{reports.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
