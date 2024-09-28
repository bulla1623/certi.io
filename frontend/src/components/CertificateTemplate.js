
import React from 'react';
import jsPDF from 'jspdf';

const CertificateTemplate = ({ data }) => {
  const { studentName, internshipDomain, startDate, endDate } = data;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Certificate of Completion`, 20, 20);
    doc.text(`This is to certify that ${studentName}`, 20, 30);
    doc.text(`has successfully completed an internship in ${internshipDomain}`, 20, 40);
    doc.text(`from ${startDate} to ${endDate}.`, 20, 50);
    doc.save('certificate.pdf');
  };

  return (
    <div className="certificate-template">
      <h3>Certificate of Completion</h3>
      <p>This is to certify that <strong>{studentName}</strong></p>
      <p>has successfully completed an internship in <strong>{internshipDomain}</strong></p>
      <p>from <strong>{startDate}</strong> to <strong>{endDate}</strong>.</p>
      <button onClick={handleDownload}>Download Certificate</button>
    </div>
  );
};

export default CertificateTemplate;
