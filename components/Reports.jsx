import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { getReports, deleteReport, createReport, updateReport } from '../services/reportService';
import ReportForm from './ReportForm';
import TextareaAutosize from 'react-textarea-autosize';
import {
    RiEditLine,
    RiDeleteBin6Line,
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiCloseLine,
    RiAddCircleLine,
    RiDownloadLine
} from 'react-icons/ri';
import styles from '../styles/pages/Reports.module.css';
import generateReportPDF from '../utils/generateReportPDF';
import { useAuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

// Componente para editar el texto de "Parts Details" con acciones
function EditablePartsDetails({ initialValue, onSave, isTechnician }) {
    const [value, setValue] = useState(initialValue);

    // Si se cancela, simplemente se reinicia el valor al original
    const handleCancel = () => {
        setValue(initialValue);
    };

    return (
        <div className={styles.textareaWrapper}>
            <TextareaAutosize
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter parts needed"
                className={styles.partsInput}
                minRows={2}
                style={{ width: '100%' }}
            />
            <div className={styles.textareaActions}>
                <RiCheckboxCircleLine
                    size={20}
                    onClick={() => onSave(value)}
                    className={styles.saveIcon}
                />
                <RiCloseLine
                    size={20}
                    onClick={handleCancel}
                    className={styles.cancelIcon}
                />
            </div>
        </div>
    );
}

const Reports = () => {
    const { isTechnician } = useAuthContext();
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [editingReport, setEditingReport] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Cargar reportes al montar el componente
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (err) {
                toast.error(err.message || 'Error fetching reports');
                console.error('Error in fetchReports:', err);
            }
        };
        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this report?');
        if (!confirmDelete) return;

        try {
            await deleteReport(id);
            setReports(reports.filter((report) => report._id !== id));
            toast.success('Reporte eliminado correctamente.');
        } catch (err) {
            toast.error(err.message || 'Error deleting report');
            console.error('Error in handleDelete:', err);
        }
    };

    const refreshReports = async () => {
        try {
            const data = await getReports();
            setReports(data);
        } catch (err) {
            toast.error(err.message || 'Error refreshing reports');
            console.error('Error in refreshReports:', err);
        }
    };

    const toggleReadyForPickup = async (id, currentState) => {
        try {
            const updatedReport = await updateReport(id, { readyForPickup: !currentState });
            setReports(reports.map(report =>
                report._id === id ? { ...report, readyForPickup: updatedReport.readyForPickup } : report
            ));
            toast.success(`Reporte marcado como ${updatedReport.readyForPickup ? 'listo' : 'no listo'} para recoger.`);
        } catch (err) {
            toast.error(err.message || 'Error updating report');
            console.error('Error in toggleReadyForPickup:', err);
        }
    };

    const toggleNeedsParts = async (id, currentState) => {
        try {
            const updatedReport = await updateReport(id, { partsRequested: !currentState });
            setReports(reports.map(report =>
                report._id === id ? { ...report, partsRequested: updatedReport.partsRequested } : report
            ));
            toast.success(`Reporte ${updatedReport.partsRequested ? 'marcado como necesita partes' : 'desmarcado de necesitar partes'}.`);
        } catch (err) {
            toast.error(err.message || 'Error updating report');
            console.error('Error in toggleNeedsParts:', err);
        }
    };

    const savePartsDetails = async (id, details) => {
        try {
            const updatedReport = await updateReport(id, { partsDetails: details });
            setReports(reports.map(report =>
                report._id === id ? { ...report, partsDetails: updatedReport.partsDetails } : report
            ));
            toast.success('Detalles de las partes guardados correctamente.');
        } catch (err) {
            toast.error(err.message || 'Error updating report');
            console.error('Error in savePartsDetails:', err);
        }
    };

    const togglePartsOrdered = async (id, currentState) => {
        try {
            const updatedReport = await updateReport(id, { partsOrdered: !currentState });
            setReports(reports.map(report =>
                report._id === id ? { ...report, partsOrdered: updatedReport.partsOrdered } : report
            ));
            toast.success(`Partes ${updatedReport.partsOrdered ? 'marcadas como solicitadas' : 'desmarcadas como solicitadas'}.`);
        } catch (err) {
            toast.error(err.message || 'Error updating report');
            console.error('Error in togglePartsOrdered:', err);
        }
    };

    return (
        <div className={styles.reportsContainer}>
            <h2 className={styles.header}>Reports</h2>
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

            {/* Permitir a todos (admins y técnicos) crear reportes */}
            <motion.button
                onClick={() => setIsCreateModalOpen(true)}
                className={styles.createButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <RiAddCircleLine size={20} style={{ marginRight: '8px' }} />
                Create Report
            </motion.button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Equipment</th>
                        <th>Status</th>
                        <th>Needs Parts</th>
                        <th>Parts Details</th>
                        <th>Parts Ordered</th>
                        <th>Ready for Pickup</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                        {reports.map((report) => (
                            <motion.tr
                                key={report._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td>{report.clientName}</td>
                                <td>
                                    {report.equipment
                                        ? `${report.equipment.type} - ${report.equipment.brand} (${report.equipment.model})`
                                        : 'N/A'}
                                </td>
                                <td>{report.status}</td>

                                {/* Switch para "Needs Parts" - Técnicos y admins pueden modificarlo */}
                                <td>
                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={report.partsRequested}
                                            onChange={() => toggleNeedsParts(report._id, report.partsRequested)}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </td>

                                {/* Editable Parts Details - Técnicos y admins pueden editar */}
                                <td>
                                    {report.partsRequested ? (
                                        <EditablePartsDetails
                                            initialValue={report.partsDetails || ''}
                                            onSave={(newValue) => savePartsDetails(report._id, newValue)}
                                            isTechnician={isTechnician}
                                        />
                                    ) : (
                                        "N/A"
                                    )}
                                </td>

                                {/* Mostrar "Parts Ordered" - Técnicos solo pueden verlo, admins pueden modificarlo */}
                                <td>
                                    {isTechnician ? (
                                        report.partsOrdered ? 'Yes' : 'No'
                                    ) : (
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={report.partsOrdered}
                                                onChange={() => togglePartsOrdered(report._id, report.partsOrdered)}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    )}
                                </td>

                                {/* Ready for Pickup - Técnicos y admins pueden modificarlo */}
                                <td
                                    onDoubleClick={() => toggleReadyForPickup(report._id, report.readyForPickup)}
                                    className={report.readyForPickup ? styles.ready : styles.notReady}
                                >
                                    {report.readyForPickup ? (
                                        <span className={styles.readyText}>
                                            <RiCheckboxCircleLine size={18} style={{ marginRight: '5px' }} />
                                            Ready
                                        </span>
                                    ) : (
                                        <span className={styles.notReadyText}>
                                            <RiCloseCircleLine size={18} style={{ marginRight: '5px' }} />
                                            Not Ready
                                        </span>
                                    )}
                                </td>

                                <td>
                                    {/* Botón de descarga para todos (admins y técnicos) */}
                                    <motion.button
                                        onClick={() => generateReportPDF(report)}
                                        className={`${styles.actionButton} ${styles.downloadButton}`}
                                        whileHover={{ scale: 1.1 }}
                                        title="Download PDF"
                                    >
                                        <RiDownloadLine size={20} />
                                    </motion.button>

                                    {/* Solo los administradores pueden editar o eliminar */}
                                    {!isTechnician && (
                                        <>
                                            <motion.button
                                                onClick={() => {
                                                    setEditingReport(report);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className={styles.actionButton}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <RiEditLine size={20} />
                                            </motion.button>
                                            <motion.button
                                                onClick={() => handleDelete(report._id)}
                                                className={styles.actionButton}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <RiDeleteBin6Line size={20} />
                                            </motion.button>
                                        </>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>

            {/* Modal para crear reporte - Disponible para todos */}
            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={() => setIsCreateModalOpen(false)}
                className={styles.modal}
                overlayClassName={styles.overlay}
                ariaHideApp={false}
            >
                <motion.div
                    className={styles.modalContent}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <ReportForm
                        refreshReports={refreshReports}
                        closeModal={() => setIsCreateModalOpen(false)}
                    />
                    <motion.button
                        onClick={() => setIsCreateModalOpen(false)}
                        className={styles.closeButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RiCloseLine size={20} style={{ marginRight: '5px' }} />
                        Close
                    </motion.button>
                </motion.div>
            </Modal>

            {/* Modal para editar reporte - Solo admins */}
            {!isTechnician && (
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                    ariaHideApp={false}
                >
                    <motion.div
                        className={styles.modalContent}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {editingReport && (
                            <ReportForm
                                refreshReports={refreshReports}
                                initialData={editingReport}
                                isEditMode
                                closeModal={() => setIsEditModalOpen(false)}
                            />
                        )}
                        <motion.button
                            onClick={() => setIsEditModalOpen(false)}
                            className={styles.closeButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RiCloseLine size={20} style={{ marginRight: '5px' }} />
                            Close
                        </motion.button>
                    </motion.div>
                </Modal>
            )}
        </div>
    );
};

export default Reports;
