import { useEffect, useState } from 'react';
import { getReports, deleteReport, createReport, updateReport } from '../services/reportService';
import ReportForm from './ReportForm'; // Importa el componente ReportForm
import styles from '../styles/components/Reports.module.css';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [editingReport, setEditingReport] = useState(null);

    // Fetch reports on component mount
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (err) {
                setError('Error fetching reports');
            }
        };
        fetchReports();
    }, []);

    // Handle delete report
    const handleDelete = async (id) => {
        try {
            await deleteReport(id);
            setReports(reports.filter((report) => report._id !== id));
        } catch (err) {
            setError('Error deleting report');
        }
    };

    // Refresh the reports list when a new report is created
    const refreshReports = async () => {
        try {
            const data = await getReports();
            setReports(data);
        } catch (err) {
            setError('Error refreshing reports');
        }
    };

    return (
        <div>
            <h2>Reports</h2>
            {error && <p className={styles.error}>{error}</p>}

            {/* Create Report Form */}
            <ReportForm refreshReports={refreshReports} />

            {/* Reports Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report._id}>
                            <td>{report.title}</td>
                            <td>{report.description}</td>
                            <td>{report.amount}</td>
                            <td>
                                <button onClick={() => setEditingReport(report)}>
                                    <i className="ri-edit-line"></i>
                                </button>
                                <button onClick={() => handleDelete(report._id)}>
                                    <i className="ri-delete-bin-6-line"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Report Form */}
            {editingReport && (
                <div className={styles.form}>
                    <h3>Edit Report</h3>
                    <input
                        type="text"
                        value={editingReport.title}
                        onChange={(e) =>
                            setEditingReport({ ...editingReport, title: e.target.value })
                        }
                    />
                    <textarea
                        value={editingReport.description}
                        onChange={(e) =>
                            setEditingReport({
                                ...editingReport,
                                description: e.target.value,
                            })
                        }
                    />
                    <input
                        type="number"
                        value={editingReport.amount}
                        onChange={(e) =>
                            setEditingReport({ ...editingReport, amount: e.target.value })
                        }
                    />
                    <button onClick={async () => {
                        await updateReport(editingReport._id, editingReport); // Usar updateReport aquí
                        setEditingReport(null);
                        refreshReports();
                    }}>
                        <i className="ri-save-line"></i> Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default Reports;
