const apiController = require('../app/controllers/apiController');
const express = require('express');
const router = express.Router();

router.get('/history', apiController.history);
router.get('/detail-local-vn', apiController.detail_local_vn);
router.get('/history-per-day', apiController.history_per_day);
router.get('/vaccine-details', apiController.vaccine_details);
module.exports = router;
