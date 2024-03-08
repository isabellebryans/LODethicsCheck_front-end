import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const DragDropFileUpload = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Select the first file (if multiple)
        const file = acceptedFiles[0];
        
        // Create a FormData object and append the file
        let formData = new FormData();
        formData.append('file', file);
        // Send the file to your backend via POST
        // axios.get('http://127.0.0.1:5000/').then(response => {
        //     // Handle success
        //     console.log(response);
        //     alert('File uploaded successfully');
        // })
        // .catch(error => {
        //     // Handle error
        //     console.error('Error:', error);
        //     alert('Error uploading file');
        // });
        // Send the file to your backend via POST
        axios.post('http://localhost:8080/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            // Handle success
            console.log(response);
            alert('File uploaded successfully');
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
            alert('Error uploading file');
        });
        // Send the file to your backend via POST
        
    }, []);

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
