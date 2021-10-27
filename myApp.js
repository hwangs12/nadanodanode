require("dotenv").config();
var express = require("express");
var app = express();

let absolutePath = __dirname + "/views/index.html";
let public = __dirname + "/public";

app.use("/public", express.static(public));

app.get("/", (req, res) => {
	res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		const uppercase = "Hello json".toUpperCase();
		res.json({ message: uppercase });
	} else {
		res.status(500).send("Something broke!");
	}
});

module.exports = app;
