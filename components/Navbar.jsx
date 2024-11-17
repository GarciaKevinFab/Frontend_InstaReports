import Link from 'next/link';
import { useAuthContext } from '../contexts/AuthContext';
import styles from '../styles/components/Navbar.module.css';

const Navbar = () => {
    const { user, handleLogout } = useAuthContext();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">InstaReports</Link>
            </div>
            {user && (
                <div className={styles.userInfo}>
                    <span className={styles.userName}>
                        <i className="ri-user-line"></i> {user.name}
                    </span>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        <i className="ri-logout-box-line"></i> Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
