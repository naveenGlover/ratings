const AWS = require("aws-sdk");

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000",
});

var dynamoDb = new AWS.DynamoDB(); //dynamodb instance

//User table creation

var params = {
    TableName: "Products",
    KeySchema: [
        {
            AttributeName: "myShopifyDomain", //partition key
            KeyType: "HASH",
        },
        {
            AttributeName: "recordType", //sort key
            KeyType: "RANGE",
        },
    ],
    AttributeDefinitions: [
        {
            AttributeName: "myShopifyDomain",
            AttributeType: "S",
        },
        {
            AttributeName: "recordType",
            AttributeType: "S",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};

dynamoDb.createTable(params, (err, data) => {
    if (err) {
        console.log(
            "Unable to create the table. Error : ",
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log("User Table created successfully... ");
    }
});
