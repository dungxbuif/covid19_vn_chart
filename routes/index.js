const apiRouter = require('./apiRouter');
module.exports = (app) => {
  app.use('/',(req,res) => res.send('Đây là trang chủ'));
  app.use('/api',apiRouter);
};
