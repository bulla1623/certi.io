
// import React, { useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';

// const StudentPortal = () => {
//   const [certificateId, setCertificateId] = useState('');
//   const [certificateData, setCertificateData] = useState(null);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`/api/certificate/${certificateId}`);
//       setCertificateData(response.data);
//       setError('');
//     } catch (error) {
//       setError('Certificate not found.');
//       setCertificateData(null);
//     }
//   };

//   const handleDownload = () => {
//     const doc = new jsPDF();
//     doc.text(`Certificate ID: ${certificateData.certificateId}`, 10, 10);
//     doc.text(`Student Name: ${certificateData.studentName}`, 10, 20);
//     doc.text(`Internship Domain: ${certificateData.internshipDomain}`, 10, 30);
//     doc.text(`Start Date: ${new Date(certificateData.startDate).toLocaleDateString()}`, 10, 40);
//     doc.text(`End Date: ${new Date(certificateData.endDate).toLocaleDateString()}`, 10, 50);
//     doc.save('certificate.pdf');
//   };

//   return (
//     <div className="student-portal">
//       <h2>Student Portal</h2>
//       <input
//         type="text"
//         placeholder="Enter Certificate ID"
//         value={certificateId}
//         onChange={(e) => setCertificateId(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//       {error && <p>{error}</p>}
//       {certificateData && (
//         <div className="certificate">
//           <h3>Certificate Details</h3>
//           <p>Student Name: {certificateData.studentName}</p>
//           <p>Internship Domain: {certificateData.internshipDomain}</p>
//           <p>Start Date: {new Date(certificateData.startDate).toLocaleDateString()}</p>
//           <p>End Date: {new Date(certificateData.endDate).toLocaleDateString()}</p>
//           <button onClick={handleDownload}>Download Certificate</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentPortal;

import React, { useState } from 'react';
import axios from 'axios';
import CertificateTemplate from './CertificateTemplate';

const StudentPortal = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/certificate/${certificateId}`);
      setCertificateData(response.data);
      setError('');
    } catch (error) {
      setError('Certificate not found.');
      setCertificateData(null);
    }
  };

  return (
    <div className="student-portal">
      <h2>Student Portal</h2>
      <input
        type="text"
        placeholder="Enter Certificate ID"
        value={certificateId}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {certificateData && <CertificateTemplate data={certificateData} />}
    </div>
  );
};

export default StudentPortal;
