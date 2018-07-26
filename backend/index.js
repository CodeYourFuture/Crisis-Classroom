require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./api');
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', apiRouter());

app.listen(process.env.PORT);
