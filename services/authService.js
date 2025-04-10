import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
};