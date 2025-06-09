const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path: "../.env"});

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const resumeRoutes = require('./routes/resumeRoutes');

app.use('/api/v1/resumes', resumeRoutes);


module.exports = app;