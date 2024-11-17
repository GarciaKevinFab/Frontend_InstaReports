import { useEffect, useState } from 'react';
import { getUsers, deleteUser, createUser, updateUser } from '../services/userService';
import styles from '../styles/components/Users.module.css';
import 'remixicon/fonts/remixicon.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'technician', password: '' });
    const [editingUser, setEditingUser] = useState(null);

    // Fetch users on component mount
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

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            setError('Error deleting user');
        }
    };

    // Handle create user
    const handleCreate = async () => {
        try {
            const user = await createUser(newUser);
            setUsers([...users, user]);
            setNewUser({ name: '', email: '', role: 'technician', password: '' });
        } catch (err) {
            setError('Error creating user');
        }
    };

    // Handle update user
    const handleUpdate = async () => {
        try {
            const updatedUser = await updateUser(editingUser._id, editingUser);
            setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
            setEditingUser(null);
        } catch (err) {
            setError('Error updating user');
        }
    };

    return (
        <div>
            <h2>Users</h2>
            {error && <p className={styles.error}>{error}</p>}

            {/* Create User Form */}
            <div className={styles.form}>
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
                <button onClick={handleCreate}>
                    <i className="ri-add-circle-line"></i> Create
                </button>
            </div>

            {/* Users Table */}
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
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => setEditingUser(user)}>
                                    <i className="ri-edit-line"></i>
                                </button>
                                <button onClick={() => handleDelete(user._id)}>
                                    <i className="ri-delete-bin-6-line"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit User Form */}
            {editingUser && (
                <div className={styles.form}>
                    <h3>Edit User</h3>
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
                    <button onClick={handleUpdate}>
                        <i className="ri-save-line"></i> Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default Users;
