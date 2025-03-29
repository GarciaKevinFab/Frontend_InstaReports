import { useState, useEffect } from 'react';
import { createReport, updateReport } from '../services/reportService';
import styles from '../styles/components/ReportForm.module.css';
import { useAuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const ReportForm = ({ refreshReports, initialData = {}, isEditMode = false, closeModal }) => {
    const { isTechnician } = useAuthContext();
    const [formData, setFormData] = useState({
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientDNI: '',
        equipment: { type: '', brand: '', model: '', serial: '', patrimonialCode: '' },
        faultDescription: '',
        observations: '',
        maintenanceType: 'Corrective',
        status: 'Operative',
        agreedPrice: '',
        comments: '',
        receptionDate: '',
        deliveryDate: '',
        files: null,
        partsRequested: false,
        partsDetails: '',
        partsOrdered: false,
        readyForPickup: false,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Cargar datos iniciales si estamos editando
    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData({
                ...initialData,
                equipment: {
                    type: initialData.equipment?.type || '',
                    brand: initialData.equipment?.brand || '',
                    model: initialData.equipment?.model || '',
                    serial: initialData.equipment?.serial || '',
                    patrimonialCode: initialData.equipment?.patrimonialCode || '',
                },
                receptionDate: initialData.receptionDate ? initialData.receptionDate.split('T')[0] : '',
                deliveryDate: initialData.deliveryDate ? initialData.deliveryDate.split('T')[0] : '',
                agreedPrice: initialData.agreedPrice || '',
                partsRequested: initialData.partsRequested || false,
                partsDetails: initialData.partsDetails || '',
                partsOrdered: initialData.partsOrdered || false,
                readyForPickup: initialData.readyForPickup || false,
            });
        }
    }, [initialData, isEditMode]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Manejar cambios específicos para el equipo
    const handleEquipmentChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            equipment: { ...prev.equipment, [name]: value },
        }));
    };

    // Manejar cambios para el archivo
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            files: e.target.files[0],
        }));
    };

    // Validar formulario
    const validateForm = () => {
        if (
            !formData.clientName ||
            !formData.clientAddress ||
            !formData.clientPhone ||
            !formData.clientDNI ||
            !formData.equipment.type ||
            !formData.equipment.brand ||
            !formData.equipment.model ||
            !formData.faultDescription ||
            !formData.receptionDate ||
            !formData.deliveryDate ||
            (formData.agreedPrice && (isNaN(formData.agreedPrice) || formData.agreedPrice <= 0))
        ) {
            setError('Por favor, completa todos los campos obligatorios y asegúrate de que el precio sea válido.');
            return false;
        }
        return true;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!validateForm()) {
            toast.error('Por favor, completa todos los campos obligatorios.');
            setLoading(false);
            return;
        }

        const dataToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'equipment') {
                Object.keys(formData.equipment).forEach((eqKey) => {
                    dataToSubmit.append(`equipment[${eqKey}]`, formData.equipment[eqKey] || '');
                });
            } else if (key === 'files' && formData.files) {
                dataToSubmit.append('file', formData.files);
            } else if (key === 'partsOrdered' && isTechnician) {
                // Los técnicos no pueden modificar partsOrdered, así que no lo enviamos
                return;
            } else {
                // Asegurarse de que los campos booleanos se envíen como true/false
                if (['partsRequested', 'partsOrdered', 'readyForPickup'].includes(key)) {
                    dataToSubmit.append(key, formData[key].toString());
                } else {
                    dataToSubmit.append(key, formData[key] || '');
                }
            }
        });

        console.log("🚀 Datos enviados:", Object.fromEntries(dataToSubmit.entries()));

        try {
            if (isEditMode) {
                await updateReport(initialData._id, dataToSubmit);
                toast.success('Reporte actualizado correctamente.');
            } else {
                await createReport(dataToSubmit);
                toast.success('Reporte creado correctamente.');
            }
            refreshReports();
            closeModal();
        } catch (error) {
            console.error('Error al guardar el reporte:', error);
            toast.error(error.message || 'Error al guardar el reporte. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>{isEditMode ? 'Editar Reporte' : 'Crear Reporte de Servicio'}</h2>

            {error && <p className={styles.error}>{error}</p>}

            {/* Información del cliente */}
            <section>
                <h3>Información del Cliente</h3>
                <input
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Nombre del Cliente"
                    required
                />
                <input
                    name="clientAddress"
                    value={formData.clientAddress}
                    onChange={handleChange}
                    placeholder="Dirección"
                    required
                />
                <input
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    required
                />
                <input
                    name="clientDNI"
                    value={formData.clientDNI}
                    onChange={handleChange}
                    placeholder="DNI"
                    required
                />
            </section>

            {/* Información del equipo */}
            <section>
                <h3>Información del Equipo</h3>
                <input
                    name="type"
                    value={formData.equipment.type}
                    onChange={handleEquipmentChange}
                    placeholder="Tipo"
                    required
                />
                <input
                    name="brand"
                    value={formData.equipment.brand}
                    onChange={handleEquipmentChange}
                    placeholder="Marca"
                    required
                />
                <input
                    name="model"
                    value={formData.equipment.model}
                    onChange={handleEquipmentChange}
                    placeholder="Modelo"
                    required
                />
                <input
                    name="serial"
                    value={formData.equipment.serial}
                    onChange={handleEquipmentChange}
                    placeholder="Número de Serie"
                />
                <input
                    name="patrimonialCode"
                    value={formData.equipment.patrimonialCode}
                    onChange={handleEquipmentChange}
                    placeholder="Código Patrimonial"
                />
            </section>

            {/* Detalles del servicio */}
            <section>
                <h3>Detalles del Servicio</h3>
                <textarea
                    name="faultDescription"
                    value={formData.faultDescription}
                    onChange={handleChange}
                    placeholder="Descripción de la Falla"
                    required
                />
                <textarea
                    name="observations"
                    value={formData.observations}
                    onChange={handleChange}
                    placeholder="Observaciones"
                />
                <select name="maintenanceType" value={formData.maintenanceType} onChange={handleChange}>
                    <option value="Corrective">Correctivo</option>
                    <option value="Preventive">Preventivo</option>
                </select>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Operative">Operativo</option>
                    <option value="Inoperative">Inoperativo</option>
                </select>
                <input
                    name="agreedPrice"
                    type="number"
                    value={formData.agreedPrice}
                    onChange={handleChange}
                    placeholder="Precio Acordado"
                    required
                />
                <input
                    name="receptionDate"
                    type="date"
                    value={formData.receptionDate}
                    onChange={handleChange}
                    placeholder="Fecha de Recepción"
                    required
                />
                <input
                    name="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    placeholder="Fecha de Entrega"
                    required
                />
            </section>

            {/* Solicitud de partes */}
            <section>
                <h3>Solicitud de Partes</h3>
                <label>
                    <input
                        type="checkbox"
                        name="partsRequested"
                        checked={formData.partsRequested}
                        onChange={handleChange}
                    />
                    Necesita Partes
                </label>
                {formData.partsRequested && (
                    <textarea
                        name="partsDetails"
                        value={formData.partsDetails}
                        onChange={handleChange}
                        placeholder="Detalles de las Partes"
                    />
                )}
                {/* Parts Ordered no se muestra en el formulario para técnicos */}
                {!isTechnician && (
                    <label>
                        <input
                            type="checkbox"
                            name="partsOrdered"
                            checked={formData.partsOrdered}
                            onChange={handleChange}
                        />
                        Partes Solicitadas
                    </label>
                )}
                <label>
                    <input
                        type="checkbox"
                        name="readyForPickup"
                        checked={formData.readyForPickup}
                        onChange={handleChange}
                    />
                    Listo para Recoger
                </label>
            </section>

            {/* Información adicional */}
            <section>
                <h3>Información Adicional</h3>
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Comentarios Adicionales"
                />
                <input type="file" onChange={handleFileChange} />
            </section>

            <button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Reporte' : 'Crear Reporte')}
            </button>
        </form>
    );
};

export default ReportForm;