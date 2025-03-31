// pages/dashboard/admin.js
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <h1>Bienvenido al Dashboard de Admin</h1>
            <p>Este es el dashboard de administrador. Usa la barra lateral para navegar a Estadísticas, Usuarios, o Reportes.</p>
        </AdminLayout>
    );
}