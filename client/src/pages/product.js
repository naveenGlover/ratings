import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import '../styles/product.css';
import StarRating from '../components/StarRating';
import { useParams } from 'react-router-dom';
import ReviewPhase from '../components/ReviewPhase';
import OverallStarRating from '../components/OverallStarRating';

export default function Product() {
    const { productHandle } = useParams();
    const useEffectRun = useRef(false);
    const [product, setProduct] = useState();
    useEffect(() => {
        if (useEffectRun.current) {
            getProductDetails();
        } return () => {
            useEffectRun.current = true;
        }
    }, [productHandle]);

    const getProductDetails = async () => {
        try {
            let product = await fetch(`http://localhost:5000/api/product?myShopifyDomain=ali-reviews-fireapps.myshopify.com&productHandle=${productHandle}`);
            product = await product.json();
            product = product.response;
            setProduct(product);
            console.log(product);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Header />
            {
                product && <> <div className="product-div">
                    <div className="product-images">
                        {product.productDetail.images.map(image => {
                            return (<img className='product-image' key={image} src={image} alt='image copy of the product' />)
                        })}
                    </div>
                    <div className="product-detail">
                        <h1 className="product-name">{product.productDetail.title}</h1>
                        <div className="product-rating-container">
                            <OverallStarRating rating={product.productDetail.avgRating} />
                            <p>4.7(27 reviews)</p>
                        </div>
                        <p className="product-price">$  {product.productDetail.price}  {product.productDetail.currencyCode}</p>
                        <p>Quantity</p>
                        <div className="quantity-phase">
                            <button className="minus"></button>
                            <p className='quantity'>1</p>
                            <button className="plus">+</button>
                        </div>
                        <button className="addToCart">Add To Cart</button>
                        <p className="description">{product.productDetail.description}</p>
                    </div>
                </div>
                    <ReviewPhase product={product} />
                </>
            }
        </div>
    )
}