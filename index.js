const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const mongooseConnection = require('./config/database');
const config = require('./config/config.js');

const port = process.env.PORT || config.webConfig["port"];

mongooseConnection.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

router(app);

app.listen(port);
