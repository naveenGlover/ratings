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
        var params1 = {
            TableName: 'Products',
            Key: {
                'myShopifyDomain': domain,
                'recordType': 'review'
            }
        };
        let response = await getItem(params1);
        if (response?.Item) {
            response = response.Item.reviews;
            response.push(productReview);
            console.log(response);
            let item = {
                myShopifyDomain: domain,
                recordType: 'review',
                reviews: response
            }
            let params2 = {
                TableName: 'Products',
                Item: item,
            }
            response = await createItem(params2);
            if (response) {
                res.status(200).send({ reviewUploded: true });
            } else {
                res.status(500).send({ reviewUploded: false });
            }
        } else {
            res.status(500).send({ response: false });
        }
    })
}

module.exports = {
    api,
};
