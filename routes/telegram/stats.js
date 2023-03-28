var express = require('express');
var router = express.Router();
var statsController = require('../../controllers/telegram/statsControllers');

router.get('/', statsController.getStats);
router.get('/lastuserreport', statsController.getLastUserStats);

module.exports = router;
