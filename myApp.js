require("dotenv").config();
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

let absolutePath = __dirname + "/views/index.html";
let public = __dirname + "/public";
let uppercase;

app.use("/public", express.static(public));
app.use((req, res, next) => {
	console.log(req.method, req.path, "-", req.ip);
	next();
}, bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		uppercase = "Hello json".toUpperCase();
	} else {
		uppercase = "Hello json";
	}
	res.json({ message: uppercase });
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);

app.get("/:word/echo", (req, res) => {
	const word = req.params.word;
	res.json({ echo: word });
});

app.route("/name")
	.get((req, res) => {
		const { first, last } = req.query;
		res.json({ name: `${first} ${last}` });
	})
	.post((req, res) => {
		const { first, last } = req.body;
		res.json({ name: `${first} ${last}` });
	});

module.exports = app;
