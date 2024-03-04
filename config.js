// config.js
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	API_URL: process.env.API_URL,
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	// port: process.env.PORT,
	DB: {
		DB_HOST: process.env.DB_HOST,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_DATABASE: process.env.DB_DATABASE
	},
	// JWToken
	JWT_SECRET: process.env.JWT_SECRET,
}
