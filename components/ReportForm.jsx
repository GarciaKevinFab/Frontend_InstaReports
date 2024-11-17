import { useState } from 'react';
import { createReport } from '../services/reportService';

const ReportForm = ({ refreshReports }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createReport({ title, description, amount });
        alert('Report created successfully!');
        setTitle('');
        setDescription('');
        setAmount('');
        if (refreshReports) {
            refreshReports(); // Actualiza la lista de reportes
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Report</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default ReportForm;
