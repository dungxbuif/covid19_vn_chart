const apiController = require('../app/controllers/apiController');
const express = require('express');
const router = express.Router();

router.get('/history', apiController.history);
router.get('/detail-local-vn', apiController["detail-local-vn"]);
router.get('/history-per-day', apiController["history-per-day"]);
module.exports = router;