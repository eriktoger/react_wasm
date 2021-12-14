const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("dist"));

app.listen(3333, () => console.log("Server running on 3333"));
