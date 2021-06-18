const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const router = express.Router();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());


const PORT = process.env.PORT || 5000;

// Routes
var routes = require("./routes");
const config = require("../config/config");
app.use (`${config.API_ENDPOINT}`, routes);

app.listen(PORT, () => {
	console.log("Listening to the port " + PORT + "...");
});
