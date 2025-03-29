import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

// Métodos adicionales para crear y actualizar usuarios
export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};
