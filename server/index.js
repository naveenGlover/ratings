const express = require("express");
const path = require("path");
const { api } = require("./api");
const cors = require('cors');

const app = express();

// setting static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

api(app); //apis

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Host Started Runing at the port ${PORT}...`));
