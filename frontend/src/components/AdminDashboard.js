
import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [manualCertificate, setManualCertificate] = useState({
    certificateId: '',
    studentName: '',
    internshipDomain: '',
    startDate: '',
    endDate: ''
  });
  const [manualStatus, setManualStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(response.data);
    } catch (error) {
      setUploadStatus('File upload failed.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualCertificate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleManualSubmit = async () => {
    try {
      const response = await axios.post('/api/certificates/add', manualCertificate);
      setManualStatus(response.data);
      // Clear the form after successful submission
      setManualCertificate({
        certificateId: '',
        studentName: '',
        internshipDomain: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      setManualStatus(error.response?.data || 'Failed to add certificate.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <p>{uploadStatus}</p>

      <h3>Manually Add Certificate</h3>
      <input
        type="text"
        name="certificateId"
        placeholder="Certificate ID"
        value={manualCertificate.certificateId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="studentName"
        placeholder="Student Name"
        value={manualCertificate.studentName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="internshipDomain"
        placeholder="Internship Domain"
        value={manualCertificate.internshipDomain}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="startDate"
        placeholder="Start Date"
        value={manualCertificate.startDate}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="endDate"
        placeholder="End Date"
        value={manualCertificate.endDate}
        onChange={handleInputChange}
      />
      <button onClick={handleManualSubmit}>Add Certificate</button>
      <p>{manualStatus}</p>
    </div>
  );
};

export default AdminDashboard;
