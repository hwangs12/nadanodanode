var express = require("express");
var app = express();

let absolutePath = __dirname + "/views/index.html";
let public = __dirname + "/public";

app.use("/public", express.static(public));

app.get("/", (req, res) => {
	res.sendFile(absolutePath);
});

module.exports = app;
