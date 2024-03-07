module.exports = {
	apps: [
		{
			name: "astridgehome_server",
			script: "./app.js",
			cron_restart: "0 */12 * * *",
		},
	],
};
