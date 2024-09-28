import React from 'react';
import FileUpload from '../components/FileUpload';
import CertificateDetails from '../components/CertificateDetails';

const HomePage = () => {
    return (
        <div>
            <h1>Certificate Verification System</h1>
            <FileUpload />
            <CertificateDetails />
        </div>
    );
};

export default HomePage;
