"use client";
import React, { useState, useCallback } from 'react';

const DragAndDrop = () => {
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile]=useState(null);
    const [preview, setPreview] = useState(null);

    const handleDragging = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleStopDragging = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); 
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file)); // Set image preview
      };

    const handleFileUpload = useCallback(() => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
          alert('File uploaded successfully!');
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
          alert('File upload failed.');
        });
    }, [selectedFile]);

    return (
        <div style={{
            paddingTop:'5em',
            alignContent:'center',
            margin:'auto',
            width:'50%',
            }}>
        <div 
        onDragOver={handleDragging}
        onDragLeave={handleStopDragging}
        onDrop={handleDrop}
        style={{
          border: dragging ? '3px dashed #00f' : '3px dashed #aaa',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: dragging ? '#f0f8ff' : '#f9f9f9',
        }}
        >
        <p>{dragging ? 'Drop an image file'  : 'Drag and drop an image or click to select'}</p>
        <input
            type="file"
            style={{ display: 'none'}}
            id="fileInput"
            onChange={handleFileSelect}
            />
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        </label>

        {preview && (
        <div style={{ marginTop: '20px' }}>
            <h3>Selected File:</h3>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        )}            
    </div>
    <div style={{padding:"1em", margin:"auto", display:"flex", justifyContent:"center"}}>
    <button
        onClick={handleFileUpload}
        style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        }}
        >
        Deblur
        </button> 
    </div>

    </div>
    );
};

export default DragAndDrop;