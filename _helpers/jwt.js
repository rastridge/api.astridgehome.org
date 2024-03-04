const expressJwt = require("express-jwt");
const { JWT_SECRET } = require("config");

module.exports = jwt;

// Dreamhost Proxy server process inserts extra '/' for reason I don't understand
// Tht's the reason  for double '//' on routes

function jwt() {
	return expressJwt({ secret: JWT_SECRET }).unless({
		path: [
			// public routes that don't require authentication
			// authentication
			"//users/authenticate", // login
			"/", // api
			"//test", //
			"//api/test", //
		],
	});
}
