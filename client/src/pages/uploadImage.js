import React, { useState } from 'react';

const uploadImage = () => {

    const preset_key = 'naveenhider';
    const cloud_name = 'dmyiqd4hd';
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const form = document.querySelector("form");
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submitting");
        const files = document.querySelector("[type=file]").files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append("file", file);
            formData.append("upload_preset", preset_key);
            console.log("formData", file);
            fetch(url, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.secure_url);
                });
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="file" name='image' multiple />
            <button type="submit">Submit</button>
        </form>
    )
}

export default uploadImage