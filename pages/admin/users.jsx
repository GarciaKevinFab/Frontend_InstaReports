import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsers, deleteUser, createUser, updateUser } from '../../services/userService';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/pages/Users.module.css';
import { RiAddCircleLine, RiEditLine, RiDeleteBin6Line, RiSaveLine } from 'react-icons/ri';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'technician', password: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Obtener usuarios al montar el componente
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError('Error fetching users');
            }
        };
        fetchUsers();
    }, []);

    // Eliminar usuario
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            setError('Error deleting user');
        }
    };

    // Crear usuario
    const handleCreate = async () => {
        try {
            const user = await createUser(newUser);
            setUsers([...users, user]);
            setNewUser({ name: '', email: '', role: 'technician', password: '' });
            setIsCreateModalOpen(false);
        } catch (err) {
            setError('Error creating user');
        }
    };

    // Actualizar usuario
    const handleUpdate = async () => {
        try {
            const updatedUser = await updateUser(editingUser._id, editingUser);
            setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
            setEditingUser(null);
            setIsEditModalOpen(false);
        } catch (err) {
            setError('Error updating user');
        }
    };

    // Variantes para animar modales y filas de la tabla
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AdminLayout>
            <div className={styles.usersContainer}>
                <h2 className={styles.header}>Users</h2>
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

                {/* Botón para abrir el modal de creación */}
                <motion.button
                    onClick={() => setIsCreateModalOpen(true)}
                    className={styles.createButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RiAddCircleLine size={20} style={{ marginRight: '5px' }} /> Create User
                </motion.button>

                {/* Tabla de usuarios */}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {users.map((user) => (
                                <motion.tr
                                    key={user._id}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={rowVariants}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <motion.button
                                            onClick={() => {
                                                setEditingUser(user);
                                                setIsEditModalOpen(true);
                                            }}
                                            className={styles.actionButton}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <RiEditLine size={20} />
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDelete(user._id)}
                                            className={styles.actionButton}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {/* Modal para crear usuario */}
                <Modal
                    isOpen={isCreateModalOpen}
                    onRequestClose={() => setIsCreateModalOpen(false)}
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                    ariaHideApp={false}
                >
                    <motion.div
                        className={styles.modalContent}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={modalVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <h3>Create User</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="technician">Technician</option>
                            <option value="admin">Admin</option>
                        </select>
                        <motion.button
                            onClick={handleCreate}
                            className={styles.saveButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RiAddCircleLine size={20} style={{ marginRight: '5px' }} /> Save
                        </motion.button>
                        <motion.button
                            onClick={() => setIsCreateModalOpen(false)}
                            className={styles.closeButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </Modal>

                {/* Modal para editar usuario */}
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                    ariaHideApp={false}
                >
                    <motion.div
                        className={styles.modalContent}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={modalVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <h3>Edit User</h3>
                        {editingUser && (
                            <>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                                <select
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                >
                                    <option value="technician">Technician</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <motion.button
                                    onClick={handleUpdate}
                                    className={styles.saveButton}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <RiSaveLine size={20} style={{ marginRight: '5px' }} /> Save
                                </motion.button>
                            </>
                        )}
                        <motion.button
                            onClick={() => setIsEditModalOpen(false)}
                            className={styles.closeButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default Users;