const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");

const apiRouter = require("./routes/api");

const tokenExtractor = require("./middlewares/jwt_token_extractor");
const unknownEndpoint = require("./middlewares/unknown_endpoint");
const errorHandler = require("./middlewares/error_handler");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use("/api", apiRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;