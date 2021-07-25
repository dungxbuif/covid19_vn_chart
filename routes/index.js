const apiRouter = require('./apiRouter');
const express = require('express');
const path = require('path');

module.exports = (app) => {
   app.use('/api', apiRouter);
};
