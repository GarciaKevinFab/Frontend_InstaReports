import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createReport = async (reportData) => {
    const response = await axios.post(`${API_URL}/reports`, reportData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getReports = async () => {
    const response = await axios.get(`${API_URL}/reports`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export const deleteReport = async (reportId) => {
    const response = await axios.delete(`${API_URL}/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export const updateReport = async (reportId, reportData) => {
    const response = await axios.put(`${API_URL}/reports/${reportId}`, reportData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};
