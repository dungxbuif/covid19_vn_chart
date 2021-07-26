const apiRouter = require('./apiRouter');
const express = require('express');
const path = require('path');

module.exports = (app) => {
   app.use('/api', (req, res, next) => {
      if (
         req.headers.api_key !== 'MY_TRACKING_COVID' ||
         req.headers.host !== 'dungxbuif-covid-tracking.herokuapp.com' ||
         req.headers.referer !==
            'https://dungxbuif-covid-tracking.herokuapp.com/' ||
         req.headers['sec-fetch-site'] !== 'same-origin'
      ) {
         res.status(500).json({ errMessage: 'You can not acccess this URL' });
      }

      next();
   });
   app.use('/api', apiRouter);
};
