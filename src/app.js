const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const health = require('./middlewares/health');
const routes = require('./routes');

const app = express();

app.use(cors());

// Use Morgan for HTTP request logging
app.use(morgan('combined'));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

//app.use(authMiddleware);

app.use('/', routes);

app.use(errorHandler);

module.exports = app;