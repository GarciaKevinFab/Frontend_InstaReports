// components/ReportForm.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { createReport, updateReport } from '../services/reportService';
import styles from '../styles/components/ReportForm.module.css';

// Common equipment types and brands
const EQUIPMENT_TYPES = [
    'PC Desktop',
    'Laptop',
    'All-in-One',
    'Impresora',
    'Monitor',
    'Escáner',
    'Servidor',
    'Tablet',
    'Smartphone',
    'Dispositivo de Red',
    'UPS',
    'Custom/Genérico',
    'Otro'
];

const EQUIPMENT_BRANDS = [
    'HP',
    'Dell',
    'Lenovo',
    'Apple',
    'Asus',
    'Acer',
    'Samsung',
    'LG',
    'MSI',
    'Toshiba',
    'Sony',
    'Canon',
    'Epson',
    'Brother',
    'Cisco',
    'Custom/Genérico',
    'Otro'
];

const ReportForm = ({ refreshReports, initialData = {}, isEditMode = false, closeModal }) => {
    const { isTechnician } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showCustomBrand, setShowCustomBrand] = useState(false);
    const [showCustomType, setShowCustomType] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Inicializar formData con valores por defecto y combinar con initialData si está en modo edición
    const [formData, setFormData] = useState({
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientDNI: '',
        equipment: {
            type: '',
            customType: '',
            brand: '',
            customBrand: '',
            model: '',
            serial: '',
            patrimonialCode: ''
        },
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

    // Definición de las pestañas
    const tabs = [
        { id: 0, name: 'Cliente' },
        { id: 1, name: 'Equipo' },
        { id: 2, name: 'Servicio' },
        ...(isEditMode ? [{ id: 3, name: 'Partes' }] : []),
        { id: isEditMode ? 4 : 3, name: 'Adicional' }
    ];

    // Rellenar formData con initialData cuando está en modo edición
    useEffect(() => {
        if (isEditMode && initialData) {
            const equipmentType = initialData.equipment?.type || '';
            const equipmentBrand = initialData.equipment?.brand || '';

            // Determinar si son tipos o marcas personalizados
            const isCustomType = !EQUIPMENT_TYPES.includes(equipmentType) && equipmentType !== '';
            const isCustomBrand = !EQUIPMENT_BRANDS.includes(equipmentBrand) && equipmentBrand !== '';

            setShowCustomType(isCustomType);
            setShowCustomBrand(isCustomBrand);

            setFormData({
                ...formData,
                clientName: initialData.clientName || '',
                clientAddress: initialData.clientAddress || '',
                clientPhone: initialData.clientPhone || '',
                clientDNI: initialData.clientDNI || '',
                equipment: {
                    type: isCustomType ? 'Otro' : equipmentType,
                    customType: isCustomType ? equipmentType : '',
                    brand: isCustomBrand ? 'Otro' : equipmentBrand,
                    customBrand: isCustomBrand ? equipmentBrand : '',
                    model: initialData.equipment?.model || '',
                    serial: initialData.equipment?.serial || '',
                    patrimonialCode: initialData.equipment?.patrimonialCode || '',
                },
                faultDescription: initialData.faultDescription || '',
                observations: initialData.observations || '',
                maintenanceType: initialData.maintenanceType || 'Corrective',
                status: initialData.status || 'Operative',
                agreedPrice: initialData.agreedPrice || '',
                comments: initialData.comments || '',
                receptionDate: initialData.receptionDate ? initialData.receptionDate.split('T')[0] : '',
                deliveryDate: initialData.deliveryDate ? initialData.deliveryDate.split('T')[0] : '',
                partsRequested: initialData.partsRequested || false,
                partsDetails: initialData.partsDetails || '',
                partsOrdered: initialData.partsOrdered || false,
                readyForPickup: initialData.readyForPickup || false,
            });
        }
    }, [initialData, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEquipmentChange = (e) => {
        const { name, value } = e.target;

        if (name === 'type') {
            setShowCustomType(value === 'Otro' || value === 'Custom/Genérico');
        }

        if (name === 'brand') {
            setShowCustomBrand(value === 'Otro' || value === 'Custom/Genérico');
        }

        setFormData((prev) => ({
            ...prev,
            equipment: { ...prev.equipment, [name]: value },
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, files: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Preparar los datos del equipo
        const equipmentData = { ...formData.equipment };
        if (showCustomType && equipmentData.customType) {
            equipmentData.type = equipmentData.customType;
        }
        if (showCustomBrand && equipmentData.customBrand) {
            equipmentData.brand = equipmentData.customBrand;
        }

        const dataToSubmit = new FormData();

        // Agregar todos los campos excepto equipment y files
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'equipment' && key !== 'files') {
                dataToSubmit.append(key, value);
            }
        });

        // Agregar los campos de equipment
        Object.entries(equipmentData).forEach(([eqKey, eqValue]) => {
            // No incluir los campos customType y customBrand en la data final
            if (eqKey !== 'customType' && eqKey !== 'customBrand') {
                dataToSubmit.append(`equipment[${eqKey}]`, eqValue);
            }
        });

        // Agregar el archivo si existe
        if (formData.files) {
            dataToSubmit.append('file', formData.files);
        }

        try {
            isEditMode
                ? await updateReport(initialData._id, dataToSubmit)
                : await createReport(dataToSubmit);
            toast.success(`Reporte ${isEditMode ? 'actualizado' : 'creado'} correctamente.`);
            refreshReports();
            closeModal();
        } catch (error) {
            toast.error('Error al guardar el reporte.');
        } finally {
            setIsLoading(false);
        }
    };

    const changeTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    // Verifica si todos los campos requeridos de una pestaña están completados
    const isTabComplete = (tabIndex) => {
        switch (tabIndex) {
            case 0: // Cliente
                return formData.clientName && formData.clientAddress &&
                    formData.clientPhone && formData.clientDNI;
            case 1: // Equipo
                const validType = formData.equipment.type &&
                    (formData.equipment.type !== 'Otro' || formData.equipment.customType);
                const validBrand = formData.equipment.brand &&
                    (formData.equipment.brand !== 'Otro' || formData.equipment.customBrand);
                return validType && validBrand && formData.equipment.model;
            case 2: // Servicio
                return formData.faultDescription && formData.agreedPrice &&
                    formData.receptionDate && formData.deliveryDate;
            default:
                return true;
        }
    };

    // Animaciones
    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const buttonVariants = {
        hover: { scale: 1.05, backgroundColor: '#C20511' },
        tap: { scale: 0.95 }
    };

    return (
        <div className={styles.formWrapper}>
            {/* Botón de Cerrar */}
            <motion.button
                className={styles.closeButton}
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Cerrar modal"
            >
                ✕
            </motion.button>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Navegación de pestañas */}
                <div className={styles.tabNavigation}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''} 
                                ${isTabComplete(tab.id) ? styles.completeTab : ''}`}
                            onClick={() => changeTab(tab.id)}
                        >
                            {tab.name}
                            {isTabComplete(tab.id) && <span className={styles.checkmark}>✓</span>}
                        </button>
                    ))}
                </div>

                {/* Contenido de las pestañas */}
                <div className={styles.tabContent}>
                    <AnimatePresence mode="wait">
                        {/* Tab 0: Cliente */}
                        {activeTab === 0 && (
                            <motion.div
                                key="tab-cliente"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.tabPanel}
                            >
                                <h3 className={styles.tabTitle}>Información del Cliente</h3>
                                <div className={styles.formGrid}>
                                    <div className={styles.inputWrapper}>
                                        <label>Nombre del Cliente *</label>
                                        <input
                                            name="clientName"
                                            value={formData.clientName}
                                            placeholder="Nombre del Cliente"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Dirección *</label>
                                        <input
                                            name="clientAddress"
                                            value={formData.clientAddress}
                                            placeholder="Dirección"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Teléfono *</label>
                                        <input
                                            name="clientPhone"
                                            value={formData.clientPhone}
                                            placeholder="Teléfono"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>DNI *</label>
                                        <input
                                            name="clientDNI"
                                            value={formData.clientDNI}
                                            placeholder="DNI"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.tabNavButtons}>
                                    <div></div> {/* Spacer */}
                                    <motion.button
                                        type="button"
                                        className={styles.nextButton}
                                        onClick={() => changeTab(1)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        disabled={!isTabComplete(0)}
                                    >
                                        Siguiente <span>→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab 1: Equipo */}
                        {activeTab === 1 && (
                            <motion.div
                                key="tab-equipo"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.tabPanel}
                            >
                                <h3 className={styles.tabTitle}>Información del Equipo</h3>
                                <div className={styles.formGrid}>
                                    <div className={styles.inputWrapper}>
                                        <label>Tipo de Equipo *</label>
                                        <select
                                            name="type"
                                            value={formData.equipment.type}
                                            onChange={handleEquipmentChange}
                                            required
                                        >
                                            <option value="">Seleccionar tipo</option>
                                            {EQUIPMENT_TYPES.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {showCustomType && (
                                        <motion.div
                                            className={styles.inputWrapper}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <label>Especificar Tipo *</label>
                                            <input
                                                name="customType"
                                                value={formData.equipment.customType}
                                                placeholder="Especificar tipo de equipo"
                                                onChange={handleEquipmentChange}
                                                required={showCustomType}
                                            />
                                        </motion.div>
                                    )}

                                    <div className={styles.inputWrapper}>
                                        <label>Marca *</label>
                                        <select
                                            name="brand"
                                            value={formData.equipment.brand}
                                            onChange={handleEquipmentChange}
                                            required
                                        >
                                            <option value="">Seleccionar marca</option>
                                            {EQUIPMENT_BRANDS.map((brand) => (
                                                <option key={brand} value={brand}>{brand}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {showCustomBrand && (
                                        <motion.div
                                            className={styles.inputWrapper}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <label>Especificar Marca *</label>
                                            <input
                                                name="customBrand"
                                                value={formData.equipment.customBrand}
                                                placeholder="Especificar marca"
                                                onChange={handleEquipmentChange}
                                                required={showCustomBrand}
                                            />
                                        </motion.div>
                                    )}

                                    <div className={styles.inputWrapper}>
                                        <label>Modelo *</label>
                                        <input
                                            name="model"
                                            value={formData.equipment.model}
                                            placeholder="Modelo"
                                            onChange={handleEquipmentChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Número de Serie</label>
                                        <input
                                            name="serial"
                                            value={formData.equipment.serial}
                                            placeholder="Número de Serie"
                                            onChange={handleEquipmentChange}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Código Patrimonial</label>
                                        <input
                                            name="patrimonialCode"
                                            value={formData.equipment.patrimonialCode}
                                            placeholder="Código Patrimonial"
                                            onChange={handleEquipmentChange}
                                        />
                                    </div>
                                </div>

                                <div className={styles.tabNavButtons}>
                                    <motion.button
                                        type="button"
                                        className={styles.prevButton}
                                        onClick={() => changeTab(0)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span>←</span> Anterior
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className={styles.nextButton}
                                        onClick={() => changeTab(2)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        disabled={!isTabComplete(1)}
                                    >
                                        Siguiente <span>→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab 2: Servicio */}
                        {activeTab === 2 && (
                            <motion.div
                                key="tab-servicio"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.tabPanel}
                            >
                                <h3 className={styles.tabTitle}>Detalles del Servicio</h3>
                                <div className={styles.formGrid}>
                                    <div className={styles.inputWrapper}>
                                        <label>Descripción de la Falla *</label>
                                        <textarea
                                            name="faultDescription"
                                            value={formData.faultDescription}
                                            placeholder="Descripción de la Falla"
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Observaciones</label>
                                        <textarea
                                            name="observations"
                                            value={formData.observations}
                                            placeholder="Observaciones"
                                            onChange={handleChange}
                                            rows={3}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Tipo de Mantenimiento</label>
                                        <select
                                            name="maintenanceType"
                                            value={formData.maintenanceType}
                                            onChange={handleChange}
                                        >
                                            <option value="Corrective">Correctivo</option>
                                            <option value="Preventive">Preventivo</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Estado</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Operative">Operativo</option>
                                            <option value="Inoperative">Inoperativo</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Precio Acordado *</label>
                                        <input
                                            type="number"
                                            name="agreedPrice"
                                            value={formData.agreedPrice}
                                            placeholder="Precio Acordado"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Fecha de Recepción *</label>
                                        <input
                                            type="date"
                                            name="receptionDate"
                                            value={formData.receptionDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Fecha de Entrega *</label>
                                        <input
                                            type="date"
                                            name="deliveryDate"
                                            value={formData.deliveryDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.tabNavButtons}>
                                    <motion.button
                                        type="button"
                                        className={styles.prevButton}
                                        onClick={() => changeTab(1)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span>←</span> Anterior
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className={styles.nextButton}
                                        onClick={() => changeTab(isEditMode ? 3 : 4)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        disabled={!isTabComplete(2)}
                                    >
                                        Siguiente <span>→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab 3: Partes (Solo en modo edición) */}
                        {isEditMode && activeTab === 3 && (
                            <motion.div
                                key="tab-partes"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.tabPanel}
                            >
                                <h3 className={styles.tabTitle}>Solicitud de Partes</h3>
                                <div className={styles.formGrid}>
                                    <div className={styles.checkboxContainer}>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                name="partsRequested"
                                                checked={formData.partsRequested}
                                                onChange={handleChange}
                                                disabled={isTechnician}
                                            />
                                            Necesita Partes
                                        </label>

                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                name="partsOrdered"
                                                checked={formData.partsOrdered}
                                                onChange={handleChange}
                                                disabled={isTechnician}
                                            />
                                            Partes Solicitadas
                                        </label>

                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                name="readyForPickup"
                                                checked={formData.readyForPickup}
                                                onChange={handleChange}
                                            />
                                            Listo para Retiro
                                        </label>
                                    </div>

                                    <AnimatePresence>
                                        {formData.partsRequested && (
                                            <motion.div
                                                className={styles.inputWrapper}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <label>Detalles de las Partes</label>
                                                <textarea
                                                    name="partsDetails"
                                                    value={formData.partsDetails}
                                                    placeholder="Detalles de las Partes"
                                                    onChange={handleChange}
                                                    rows={4}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className={styles.tabNavButtons}>
                                    <motion.button
                                        type="button"
                                        className={styles.prevButton}
                                        onClick={() => changeTab(2)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span>←</span> Anterior
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className={styles.nextButton}
                                        onClick={() => changeTab(4)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        Siguiente <span>→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab 4 o 3: Información Adicional */}
                        {activeTab === (isEditMode ? 4 : 3) && (
                            <motion.div
                                key="tab-adicional"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles.tabPanel}
                            >
                                <h3 className={styles.tabTitle}>Información Adicional</h3>
                                <div className={styles.formGrid}>
                                    <div className={styles.inputWrapper}>
                                        <label>Adjuntar Archivo</label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className={styles.fileInput}
                                        />
                                        {formData.files && <span className={styles.fileName}>{formData.files.name}</span>}
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Comentarios Adicionales</label>
                                        <textarea
                                            name="comments"
                                            value={formData.comments}
                                            placeholder="Comentarios Adicionales"
                                            onChange={handleChange}
                                            rows={4}
                                        />
                                    </div>
                                </div>

                                {/* Botones de acción final */}
                                <div className={styles.tabNavButtons}>
                                    <motion.button
                                        type="button"
                                        className={styles.prevButton}
                                        onClick={() => changeTab(isEditMode ? 3 : 2)}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span>←</span> Anterior
                                    </motion.button>
                                    <div className={styles.finalButtonGroup}>
                                        <motion.button
                                            type="button"
                                            className={styles.cancelButton}
                                            onClick={closeModal}
                                            variants={buttonVariants}
                                            whileHover={{ scale: 1.05, backgroundColor: '#666' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Cancelar
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            className={styles.submitButton}
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </div>
    );
};

export default ReportForm;