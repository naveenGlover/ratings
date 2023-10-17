const { createItem, getItem, queryItem, deleteItem, updateItem, scanItem, } = require("./db/docClientActions");
const { v4: uuidv4 } = require('uuid');
const api = (app) => {
    // adding product to the table
    app.post("/api/add/product", async (req, res) => {
        var params = {
            TableName: 'Products',
            Item: req.body,
        }
        let response = await createItem(params);
        if (response) {
            res.status(200).send({ productsCreated: true });
        } else {
            res.status(500).send({ productsCreated: false });
        }
    });

    // adding review of the product
    app.post("/api/product/review", async (req, res) => {
        var params = {
            TableName: 'Products',
            Item: req.body,
        }
        let response = await createItem(params);
        if (response) {
            res.status(200).send({ reviewUploded: true });
        } else {
            res.status(500).send({ reviewUploded: false });
        }
    });

    app.get("/api/product", async (req, res) => {
        let productHandle = req.query.productHandle;
        var params = {
            TableName: 'Products',
            KeyConditionExpression: 'myShopifyDomain = :domain',
            ExpressionAttributeValues: {
                ':domain': req.query.myShopifyDomain,
            }
        };
        let response = await queryItem(params);
        if (response?.Items) {
            let product = {}
            let productDetail = response.Items[0].products.filter(product => product.productHandle == productHandle);
            let productReviews = response.Items[1].reviews.filter(product => product.productHandle == productHandle);
            product.productDetail = productDetail[0];
            product.productReviews = productReviews;
            res.status(200).send({ response: product });
        } else {
            res.status(200).send({ response: false });
        }
    });

    app.post("/api/product/review/add", async (req, res) => {
        let productReview = req.body.review;
        let domain = req.body.domain;
        let productHandle = productReview.productHandle;
        var params = {
            TableName: 'Products',
            KeyConditionExpression: 'myShopifyDomain = :domain',
            ExpressionAttributeValues: {
                ':domain': domain
            }
        };
        let response = await queryItem(params);
        if (response?.Items) {
            response = response.Items;
            let product = response[0];
            let productReviews = response[1];
            productReviews = productReviews.reviews;
            let productsArray = product.products;
            let changeArray = productsArray.filter(obj => obj.productHandle === productHandle);
            productsArray = productsArray.filter(obj => obj.productHandle !== productHandle);
            let changedObj = changeArray[0];
            let totalReviews = changedObj.totalReviews;
            let avgRating = changedObj.avgRating;
            avgRating = (avgRating * totalReviews) + productReview.overallRating;
            totalReviews += 1;
            changedObj.individual_reviews[`${productReview.overallRating}star`] += 1;
            avgRating = (avgRating / totalReviews).toFixed(3);
            changedObj['totalReviews'] = totalReviews;
            changedObj['avgRating'] = Number(avgRating);
            productsArray.push(changedObj);
            productReviews.push(productReview);
            let productObject = {
                myShopifyDomain: domain,
                recordType: 'products',
                products: productsArray
            }
            let productReviewsObject = {
                myShopifyDomain: domain,
                recordType: 'review',
                reviews: productReviews
            }
            let params1 = {
                TableName: 'Products',
                Item: productObject
            }
            let params2 = {
                TableName: 'Products',
                Item: productReviewsObject
            }
            let productResponse = await createItem(params1);
            let reviewResponse = await createItem(params2);
            if (productResponse && reviewResponse) {
                res.status(200).send({ response: 'Review Added' });
            } else {
                res.status(500).send({ response: false })
            }
        } else {
            res.status(500).send({ response: false });
        }
    })
}

module.exports = {
    api,
};
