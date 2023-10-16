// src/components/ImageUploader.js

import React, { useState, useRef } from 'react';
import '../styles/ImageUploader.css';

function ImageUploader() {
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputName = useRef(null);

    const handleFileSelect = (e) => {
        var files = e.target.files;
        const imagePreviews = [];

        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    imagePreviews.push({
                        src: e.target.result,
                        file,
                    });
                    setSelectedImages([...selectedImages, ...imagePreviews]);
                };

                reader.readAsDataURL(file);
            }
        }
        fileInputName.current.value = '';
    };

    const removeImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
        if (selectedImages.length == 0) {
            fileInputName.current.value = null;
        }
    };

    return (
        <div className="image-uploader">
            <label htmlFor="image-input">Add Images</label>
            <input
                name='image-input'
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputName}
                className='hide-file-input-text'
            />
            <div className="image-preview-container">
                {selectedImages.map((image, index) => (
                    <div className="image-preview" key={index}>
                        <img src={image.src} alt={`Preview ${index}`} />
                        <button onClick={() => removeImage(index)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageUploader;
