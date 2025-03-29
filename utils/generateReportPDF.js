import jsPDF from 'jspdf';

// Función para generar y descargar un PDF para un reporte específico
const generateReportPDF = (report) => {
    const doc = new jsPDF();

    // Configuración inicial del PDF
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Función para verificar si necesitamos una nueva página
    const checkPageOverflow = () => {
        if (yPosition > pageHeight - margin * 2) {
            doc.addPage();
            yPosition = margin;
            // Volver a dibujar el encabezado en la nueva página
            doc.setFontSize(20);
            doc.setTextColor(0, 102, 204);
            doc.text('InstaReports - Report Details', margin, yPosition);
            yPosition += 10;
            doc.setLineWidth(0.5);
            doc.setDrawColor(0, 102, 204);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 10;
        }
    };

    // Encabezado del PDF
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204); // Color azul para el título
    doc.text('InstaReports - Report Details', margin, yPosition);
    yPosition += 10;

    // Línea divisoria debajo del encabezado
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 102, 204); // Color azul para la línea
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Detalles del reporte
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Color negro para el texto

    // Client Name
    doc.setFont('helvetica', 'bold');
    doc.text('Client Name:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.clientName || 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Client Address
    doc.setFont('helvetica', 'bold');
    doc.text('Client Address:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const clientAddress = report.clientAddress || 'N/A';
    const splitClientAddress = doc.splitTextToSize(clientAddress, pageWidth - margin * 2 - 40);
    doc.text(splitClientAddress, margin + 40, yPosition);
    yPosition += splitClientAddress.length * 8;
    checkPageOverflow();

    // Client Phone
    doc.setFont('helvetica', 'bold');
    doc.text('Client Phone:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.clientPhone || 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Client DNI
    doc.setFont('helvetica', 'bold');
    doc.text('Client DNI:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.clientDNI || 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Equipment
    doc.setFont('helvetica', 'bold');
    doc.text('Equipment:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const equipmentText = report.equipment
        ? `${report.equipment.type} - ${report.equipment.brand} (${report.equipment.model})`
        : 'N/A';
    const splitEquipment = doc.splitTextToSize(equipmentText, pageWidth - margin * 2);
    doc.text(splitEquipment, margin + 40, yPosition);
    yPosition += splitEquipment.length * 8;
    checkPageOverflow();

    // Status
    doc.setFont('helvetica', 'bold');
    doc.text('Status:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.status || 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Fault Description
    doc.setFont('helvetica', 'bold');
    doc.text('Fault Description:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const faultDescription = report.faultDescription || 'N/A';
    const splitFaultDescription = doc.splitTextToSize(faultDescription, pageWidth - margin * 2 - 40);
    doc.text(splitFaultDescription, margin + 40, yPosition);
    yPosition += splitFaultDescription.length * 8;
    checkPageOverflow();

    // Observations
    doc.setFont('helvetica', 'bold');
    doc.text('Observations:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const observations = report.observations || 'N/A';
    const splitObservations = doc.splitTextToSize(observations, pageWidth - margin * 2 - 40);
    doc.text(splitObservations, margin + 40, yPosition);
    yPosition += splitObservations.length * 8;
    checkPageOverflow();

    // Maintenance Type
    doc.setFont('helvetica', 'bold');
    doc.text('Maintenance Type:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.maintenanceType || 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Agreed Price
    doc.setFont('helvetica', 'bold');
    doc.text('Agreed Price:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.agreedPrice || 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Comments
    doc.setFont('helvetica', 'bold');
    doc.text('Comments:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const comments = report.comments || 'N/A';
    const splitComments = doc.splitTextToSize(comments, pageWidth - margin * 2 - 40);
    doc.text(splitComments, margin + 40, yPosition);
    yPosition += splitComments.length * 8;
    checkPageOverflow();

    // Reception Date
    doc.setFont('helvetica', 'bold');
    doc.text('Reception Date:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.receptionDate ? new Date(report.receptionDate).toLocaleDateString() : 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Delivery Date
    doc.setFont('helvetica', 'bold');
    doc.text('Delivery Date:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.deliveryDate ? new Date(report.deliveryDate).toLocaleDateString() : 'N/A'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Needs Parts
    doc.setFont('helvetica', 'bold');
    doc.text('Needs Parts:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.partsRequested ? 'Yes' : 'No'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Parts Details
    doc.setFont('helvetica', 'bold');
    doc.text('Parts Details:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    const partsDetails = report.partsRequested ? (report.partsDetails || 'N/A') : 'N/A';
    const splitPartsDetails = doc.splitTextToSize(partsDetails, pageWidth - margin * 2 - 40);
    doc.text(splitPartsDetails, margin + 40, yPosition);
    yPosition += splitPartsDetails.length * 8;
    checkPageOverflow();

    // Parts Ordered
    doc.setFont('helvetica', 'bold');
    doc.text('Parts Ordered:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.partsOrdered ? 'Yes' : 'No'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Ready for Pickup
    doc.setFont('helvetica', 'bold');
    doc.text('Ready for Pickup:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`${report.readyForPickup ? 'Ready' : 'Not Ready'}`, margin + 40, yPosition);
    yPosition += 8;
    checkPageOverflow();

    // Created At
    if (report.createdAt) {
        doc.setFont('helvetica', 'bold');
        doc.text('Created At:', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(`${new Date(report.createdAt).toLocaleDateString()}`, margin + 40, yPosition);
        yPosition += 8;
        checkPageOverflow();
    }

    // Pie de página (solo en la última página)
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150); // Color gris para el pie de página
    doc.text(
        `Generated by InstaReports on ${new Date().toLocaleDateString()}`,
        margin,
        pageHeight - 10
    );

    // Guardar el PDF
    doc.save(`report_${report.clientName || 'unknown'}_${report._id}.pdf`);
};

export default generateReportPDF;