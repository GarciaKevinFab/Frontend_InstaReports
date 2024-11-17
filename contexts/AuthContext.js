import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/router'; // Importa useRouter para redirigir
import { login } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter(); // Hook para redirigir

    const handleLogin = async (email, password) => {
        const userData = await login(email, password);
        setUser(userData);
        localStorage.setItem('token', userData.token);
        return userData;
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        router.push('/login'); // Redirige al login después del logout
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
