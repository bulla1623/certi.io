import React, { useState, useEffect } from 'react';
import { getAllCertificates, deleteCertificateById, updateCertificate } from '../services/certificateService';

const CertificateList = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const data = await getAllCertificates();
            setCertificates(data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCertificateById(id);
            fetchCertificates();
        } catch (error) {
            console.error('Error deleting certificate:', error);
        }
    };

    const handleUpdate = async (id) => {
        const updatedData = { /* your updated data here */ };
        try {
            await updateCertificate(id, updatedData);
            fetchCertificates();
        } catch (error) {
            console.error('Error updating certificate:', error);
        }
    };

    return (
        <div>
            <h1>Certificates</h1>
            <ul>
                {certificates.map((certificate) => (
                    <li key={certificate.id}>
                        <h2>{certificate.title}</h2>
                        <p>{certificate.description}</p>
                        <button onClick={() => handleUpdate(certificate.id)}>Update</button>
                        <button onClick={() => handleDelete(certificate.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificateList;
