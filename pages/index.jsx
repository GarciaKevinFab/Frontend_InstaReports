import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login'); // Redirige a la página de login
    }, [router]);

    return null; // No renderiza nada en esta página
}
