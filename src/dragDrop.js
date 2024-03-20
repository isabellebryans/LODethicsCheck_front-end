import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const DragDropFileUpload = ({ onUploadResponse, onLoadingChange }) => { // Add onLoadingChange prop
    const onDrop = useCallback(acceptedFiles => {
        // Notify parent that loading has started
        onLoadingChange(true);

        const file = acceptedFiles[0];
        let formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8080/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            onUploadResponse(response.data);
            console.log(response);
            alert('File uploaded successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading file');
        }).finally(() => {
            // Notify parent that loading has stopped
            onLoadingChange(false);
        });
        
    }, [onUploadResponse, onLoadingChange]); // Include new prop in dependency array

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div {...getRootProps()} style={{border: '2px dashed #007bff', borderRadius: '5px', padding: '20px', width: '50%', margin: 'auto', textAlign: 'center'}}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the file here ...</p> :
                    <p>Drag 'n' drop a file here, or click to select a file</p>
            }
        </div>
    );
};

export default DragDropFileUpload;
