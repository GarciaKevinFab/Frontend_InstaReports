import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../contexts/AuthContext';
import styles from '../styles/components/Login.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { handleLogin, user, loading } = useAuthContext();
    const router = useRouter();

    // Redirigir si el usuario ya está autenticado
    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        if (user.role === 'technician') {
            router.push('/dashboard/technician');
        } else if (user.role === 'admin') {
            router.push('/admin'); // Ajustamos la redirección para que coincida con las rutas del Sidebar
        }
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await handleLogin(email, password);

            // Redirige según el rol del usuario
            if (user.role === 'technician') {
                router.push('/dashboard/technician');
            } else if (user.role === 'admin') {
                router.push('/admin'); // Ajustamos la redirección
            } else {
                setError('Invalid role');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Login</h1>
                {error && <p className={styles.error}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;