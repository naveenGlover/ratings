import React, { useState } from 'react'
import StarRating from './StarRating';
import '../styles/ImageUploader.css';
import RadioGroupRating from './SummaryRating';

const ReviewForm = ({ productHandle, formSubmit }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [formDetails, setFormDetails] = useState({
        userName: '',
        email: '',
        feedback: '',
        images: [],
        productRating: 0,
        summaryRating: {
            quality: 0,
            price: 0,
            shipping: 0,
            support: 0
        }
    })
    const handleInput = (event) => {
        let input = event.target.name;
        let input_value = event.target.value;
        setFormDetails(prev => ({
            ...prev,
            [input]: input_value
        }))
    }
    const preset_key = 'naveenhider';
    const cloud_name = 'dmyiqd4hd';
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const formReset = () => {
        setFormDetails({
            userName: '',
            email: '',
            feedback: '',
            images: [],
            productRating: 0,
            summaryRating: {
                quality: 0,
                price: 0,
                shipping: 0,
                support: 0
            }
        })

    }
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const validateForm = () => {
        let result = true;
        let userName = formDetails.userName;
        let email = formDetails.email;
        let feedback = formDetails.feedback;
        let productRating = formDetails.productRating;
        if (userName === '') {
            result = false;
        }
        if (!isValidEmail(email)) {
            result = false;
        }
        if (feedback === '') {
            result = false;
        }
        if (productRating === 0) {
            result = false;
            document.getElementById('star-rating-errorMsg').style.display = 'block';
        }
        return result;
    }
    const onSubmit = async () => {
        let form = document.getElementById('form');
        form.addEventListener('submit', e => e.preventDefault());
        if (validateForm()) {
            let date = new Date();
            date = date.toISOString();
            let images = [];
            if (formDetails.images.length > 0) {
                images = await imageUploader();
            }
            let review = {
                productHandle: productHandle,
                overallRating: formDetails.productRating,
                images: images,
                feedback: formDetails.feedback,
                customerName: formDetails.userName,
                customerEmail: formDetails.email,
                date: date,
                qualityRating: formDetails.summaryRating.quality,
                priceRating: formDetails.summaryRating.price,
                shippingRating: formDetails.summaryRating.shipping,
                supportRating: formDetails.summaryRating.support,
                totalLikes: 0,
                totalDislikes: 0,
            }
            let reviewObject = {
                domain: 'ali-reviews-fireapps.myshopify.com',
                review: review
            }
            let response = await fetch('http://localhost:5000/api/product/review/add', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewObject),
            });
            response = await response.json();
            console.log("Review", response);
            formReset();
        }
    }
    const imageUploader = async () => {
        const files = formDetails.images;
        var image_url = [];
        for (let i = 0; i < files.length; i++) {
            let formData = new FormData();
            let file = files[i].file;
            formData.append("file", file);
            formData.append("upload_preset", preset_key);
            let response = await fetch(url, {
                method: "POST",
                body: formData
            });
            response = await response.json();
            if (response && response.secure_url) {
                image_url.push(response.secure_url);
            }
        }
        return image_url;
    }
    const handleFileSelect = (e) => {
        if ((document.querySelector("[type=file]").files.length + formDetails.images.length) <= 5) {
            var files = document.querySelector("[type=file]").files;
            let elem = document.getElementById('image-preview-container-error');
            elem.style.display = 'none';

            for (const file of files) {
                let image_file = undefined;
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        image_file = {
                            src: e.target.result,
                            file,
                        };
                        setFormDetails(prevState => ({ ...prevState, images: [...prevState.images, image_file] }));
                    };
                    reader.readAsDataURL(file);
                }
            }
        } else {
            let elem = document.getElementById('image-preview-container-error');
            elem.style.display = 'block';
        }
    };

    const removeImage = (index) => {
        const updatedImages = [...formDetails.images];
        updatedImages.splice(index, 1);
        setFormDetails(prevState => ({
            ...prevState,
            images: updatedImages
        }));
        let elem = document.getElementById('image-preview-container-error');
        elem.style.display = 'none';
    };
    return (
        <div className='form-container'>
            <form className='review-form' id='form'>
                <h1 className="form-title">
                    Write a Review
                </h1>
                <div className="form-group">
                    <div className="product-rating">
                        <h4>Rating</h4>
                        <StarRating rating={formDetails.productRating} rateProduct={(rating) => {
                            setFormDetails(prevState => ({
                                ...prevState,
                                productRating: rating
                            }));
                            document.getElementById('star-rating-errorMsg').style.display = 'none';
                        }} />
                        <div className="image-uploader">
                            <label htmlFor="imageInput" className='image-input-label'>
                                <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 279.223 279.223" space="preserve">
                                    <g>
                                        <path d="M264.386,61.764L64.02,33.363c-9.415-1.324-18.144,5.01-19.482,14.455l-4.689,34.217H17.33 C7.837,82.035,0,90.215,0,99.714v129.228c0,9.499,7.837,17.094,17.337,17.094h228.329c9.499,0,17.334-7.595,17.334-17.094v-32.593 c0-0.308,0.103-0.62,0.148-0.944L279.052,81.24C280.385,71.835,273.791,63.097,264.386,61.764z M248,228.807	c0,1.23-0.997,2.228-2.227,2.228H17.228c-1.23,0-2.228-0.997-2.228-2.228V99.262c0-1.23,0.997-2.228,2.228-2.228h228.545 c1.23,0,2.227,0.997,2.227,2.228V228.807z" />
                                        <path d="M173.226,156.911c-2.93-2.928-7.678-2.928-10.607,0l-16.726,16.726l-31.118-31.117c-2.93-2.928-7.678-2.928-10.607,0 l-58.414,58.415c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196 l53.11-53.112l25.814,25.814l-16.69,16.69c-2.929,2.93-2.929,7.678,0,10.607c2.93,2.928,7.678,2.928,10.607,0l38.72-38.721 l38.72,38.721c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196c2.929-2.93,2.929-7.678,0-10.607 L173.226,156.911z" />
                                        <path d="M195.744,156.737c11.53,0,20.91-9.381,20.91-20.911c0-11.529-9.38-20.909-20.91-20.909c-11.53,0-20.91,9.38-20.91,20.909 C174.834,147.356,184.214,156.737,195.744,156.737z" />
                                    </g>
                                </svg>
                                Add Images
                            </label>
                            <input
                                id="imageInput"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                                className='hide-file-input-text'
                            />

                            <div className="image-preview-container">
                                {formDetails.images.map((image, index) => (
                                    <div className="image-preview" key={index}>
                                        <img src={image.src} alt={`Preview ${index}`} />
                                        <button type='button' className='remove-btn' onClick={() => removeImage(index)}>&#10005;</button>
                                    </div>
                                ))}
                            </div>
                            <p id="image-preview-container-error">
                                Maximum File Size to Upload is 5
                            </p>
                        </div>
                        <div className="summary-questions-container">
                            <p>How do you rate the quality of our product?</p>
                            <RadioGroupRating type={'quality'} setRating={(rating, type) => setFormDetails(prev => ({ ...prev, summaryRating: { ...prev.summaryRating, [type]: rating } }))} />
                            <p>How satisfied are you with our pricing?</p>
                            <RadioGroupRating type={'price'} setRating={(rating, type) => setFormDetails(prev => ({ ...prev, summaryRating: { ...prev.summaryRating, [type]: rating } }))} />
                            <p>Given your deliver experience with our product, would you refer us to a friend?</p>
                            <RadioGroupRating type={'shipping'} setRating={(rating, type) => setFormDetails(prev => ({ ...prev, summaryRating: { ...prev.summaryRating, [type]: rating } }))} />
                            <p>How would you rate your overall experience with our customer support team?</p>
                            <RadioGroupRating type={'support'} setRating={(rating, type) => setFormDetails(prev => ({ ...prev, summaryRating: { ...prev.summaryRating, [type]: rating } }))} />
                        </div>
                    </div>
                    <div className="form-gorup-right">
                        <label htmlFor="feedback">Feedback</label><br />
                        <textarea id="feedback" value={formDetails.feedback} maxLength={200} name='feedback' onChange={handleInput} placeholder='Share your Thoughts about the product' required />
                        <label htmlFor="userName">Name</label>
                        <input type="text" id='userName' value={formDetails.userName} name='userName' onChange={handleInput} placeholder='Enter Your Name' required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={formDetails.email} name='email' onChange={handleInput} placeholder='Enter Your Email' required />
                    </div>

                </div>
                <input type='submit' onClick={onSubmit} value='Submit Review' className='formSubmit-btn' />
            </form>
        </div>
    )
}

export default ReviewForm;