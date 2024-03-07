require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("_helpers/jwt");

const errorHandler = require("_helpers/error-handler");
const nocache = require("nocache");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
//const activityLog = require("_helpers/activity-log")

const accessLogStream = rfs.createStream("access.log", {
	interval: "1d", // rotate daily
	path: "/home/rastridge/api.astridgehome.org/logs/requests/",
});

// app.use(bodyParser.json())
app.use(express.json());
app.use(morgan("common", { stream: accessLogStream, immediate: false }));
app.use(cors());
app.use(jwt());

app.use(nocache());
// Dreamhost Proxy server process inserts extra '/' for reason I don't understand
//   this eliminates 'extra' '/'
//

// Middleware to normalise the request URL
app.use((req, res, next) => {
	// Replace multiple leading slashes with a single slash
	req.url = req.url.replace(/^\/+/, "/");
	next();
});

// for testing purposes
//
app.get("/", function (request, response) {
	response.writeHead(200, { "Content-Type": "text/plain" });
	response.end("/ is working yahoo");
});

app.get("/test", function (request, response) {
	response.writeHead(200, { "Content-Type": "text/plain" });
	response.end("/test is working");
});

app.get("/api/test", (req, res) => {
	response.writeHead(200, { "Content-Type": "text/plain" });
	res.send("/api/test is working");
});

// api routes  - ENTRY POINTS
app.use(
	"/supportingaccounts",
	require("./apps/supportingaccounts/supportingaccounts.controller")
);
app.use("/users", require("./apps/users/users.controller"));

app.use(errorHandler); // next()

const { DB, PORT } = require("config");

const server = app.listen(PORT, function () {
	console.log(
		"BRC api server listening on port " +
			PORT +
			" using DB " +
			DB.DB_DATABASE +
			" on " +
			DB.DB_HOST
	);
});
