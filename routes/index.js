const apiRouter = require('./apiRouter');
const express = require('express');
const path = require('path');

module.exports = (app) => {
   app.use('/api', (req, res, next) => {
      console.log(req.headers);
      if (
         req.headers.api_key !== 'MY_TRACKING_COVID' ||
         req.headers.host !== 'dungxbuif-covid-tracking.herokuapp.com'
      ) {
         res.json({ errStatus: 'You can not acccess this URL' });
      }

      next();
   });
   app.use('/api', apiRouter);
};
