import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createReport = async (reportData) => {
    try {
        const response = await axios.post(`${API_URL}/reports`, reportData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en createReport:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al crear el reporte');
    }
};

export const getReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/reports`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error en getReports:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al obtener los reportes');
    }
};

export const deleteReport = async (reportId) => {
    try {
        const response = await axios.delete(`${API_URL}/reports/${reportId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error en deleteReport:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al eliminar el reporte');
    }
};

export const updateReport = async (reportId, reportData) => {
    try {
        const formData = new FormData();

        for (const key in reportData) {
            if (typeof reportData[key] === 'object' && reportData[key] !== null && key !== 'files') {
                for (const subKey in reportData[key]) {
                    formData.append(`${key}[${subKey}]`, reportData[key][subKey]);
                }
            } else {
                formData.append(key, reportData[key]);
            }
        }

        if (reportData.files) {
            formData.append('file', reportData.files);
        }

        console.log("🚀 Enviando datos a updateReport:", Object.fromEntries(formData.entries()));

        const response = await axios.put(`${API_URL}/reports/${reportId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error en updateReport:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar el reporte');
    }
};