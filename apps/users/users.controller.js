const express = require("express");
const router = express.Router();
const userService = require("./users.service");

////////////// ROUTES //////////////////////
router.post("/authenticate", authenticate);

module.exports = router;

function authenticate(req, res, next) {
	userService
		.authenticate(req.body)
		.then((user) => {
			user ? res.json(user) : res.status(400).json({ message: "Login failed" });
		})
		.catch((err) => next(err));
}
