import React, { useState } from 'react';
import { getCertificateById } from '../services/certificateService';

const CertificateDetails = () => {
    const [certificateId, setCertificateId] = useState('');
    const [certificate, setCertificate] = useState(null);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setCertificateId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getCertificateById(certificateId);
            setCertificate(response);
            setMessage('');
        } catch (error) {
            setMessage(error);
            setCertificate(null);
        }
    };

    return (
        <div>
            <h2>Retrieve Certificate Details</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={certificateId}
                    onChange={handleInputChange}
                    placeholder="Enter Certificate ID"
                />
                <button type="submit">Retrieve</button>
            </form>
            {message && <p>{message}</p>}
            {certificate && (
                <div>
                    <h3>Certificate Details</h3>
                    <p>Certificate ID: {certificate.certificateId}</p>
                    <p>Student Name: {certificate.studentName}</p>
                    <p>Internship Domain: {certificate.internshipDomain}</p>
                    <p>Start Date: {new Date(certificate.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(certificate.endDate).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
};

export default CertificateDetails;
