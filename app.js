const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const SubjectController = require("./SubjectController");
var db = mongoose.connection;
var app = express();


/***
	Connecting to database
***/
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/subject");
db.on("error", console.error.bind(console, "Error:"));
db.once("open", () => {
	console.log("Connected");
});


/***
	Configuring app
***/
// Adding body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// creating public dir
app.use(express.static("public"));


/***
	Setting up routes
***/
app.get("/", (req, res) => {
	return res.sendfile("public/index.html");
});

app.get("/api/getsubject", (req, res) => {
	SubjectController.getRandomSubject((msg) => {
			return res.json({
				sub: msg.sub.subject,
				err: msg.err
			});
	});
});

app.post("/api/addsubject", (req, res) => {
	SubjectController.addSubject(req.body, (msg) => {
		return res.json(msg);
	});
});

app.post("/api/flagsubject", (req, res) => {
	SubjectController.flagSubject(req.body, (msg) => {
		return res.json(msg);
	});
});


/***
	Turning on Server
***/
app.listen(process.env.PORT || 3000, function() {
	console.log("Listening");
});
