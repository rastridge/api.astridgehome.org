const { JWT_SECRET } = require("config");
const jwt = require("jsonwebtoken");
const activityLog = require("_helpers/activity-log");

module.exports = {
	authenticate,
};

async function authenticate({ username, password }) {
	if (username.toLowerCase() === "wildwood" && password === "Wildwood") {
		const token = jwt.sign(
			{
				sub: "0001",
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
			},
			JWT_SECRET
		);

		const user = {
			admin_user_id: 1,
			admin_user_name: "rastridge",
			admin_user_email: "ron.astridge@me.com",
		};
		return {
			admin_user_id: 1,
			admin_user_name: "rastridge",
			admin_user_email: "ron.astridge@me.com",
			token,
		};
	}
	return null;
}
