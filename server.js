require('dotenv').config();
const https = require("http");
const app = require("./app");
const { dbConnect } = require("./helper/dbConnection");
const port = process.env.PORT;
const server = https.createServer(app);
server.listen(port, (_) => console.log(`Server is Running on port ${port}`));
