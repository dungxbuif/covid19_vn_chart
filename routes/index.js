const apiRouter = require('./apiRouter');
const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use('/api',apiRouter);

  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  // All other GET requests not handled before will return our React app
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

};
