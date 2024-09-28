import React, { useState } from 'react';
import { uploadFile } from '../services/certificateService';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await uploadFile(file);
            setMessage(response.message);
        } catch (error) {
            setMessage(error);
        }
    };

    return (
        <div>
            <h2>Upload Certificate File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
