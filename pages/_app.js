import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css'; // Tu archivo de estilos globales

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
