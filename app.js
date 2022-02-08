require("dotenv/config");

const { capitalize } = require('./utils')

require("./db");

const express = require("express");
const app = express();

require("./config")(app);
require("./config/session.config")(app);

app.locals.appTitle = capitalize(`iron full app!`);

// routes
require('./routes')(app)

require("./error-handling")(app);

module.exports = app;
