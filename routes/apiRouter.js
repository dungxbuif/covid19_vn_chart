const apiController = require('../app/controllers/apiController');
const express = require('express');
const router = express.Router();

router.get('/history', apiController.history);
router.get('/detail-local-vn', apiController["detail-local-vn"]);
module.exports = router;