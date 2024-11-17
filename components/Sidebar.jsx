import styles from '../styles/components/Sidebar.module.css';

const Sidebar = ({ setActiveSection }) => {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Admin Panel</h2>
            <ul className={styles.menu}>
                <li onClick={() => setActiveSection('statistics')}>Statistics</li>
                <li onClick={() => setActiveSection('users')}>Users</li>
                <li onClick={() => setActiveSection('reports')}>Reports</li>
                <li onClick={() => alert('Feature Coming Soon!')}>More Features</li>
            </ul>
        </div>
    );
};

export default Sidebar;
