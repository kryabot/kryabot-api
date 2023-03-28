var express = require('express');
var router = express.Router();
var telegramGroupController = require('../../controllers/telegram/groupController');

router.get('/', telegramGroupController.getGroup);
router.post('/', telegramGroupController.setGroup);

module.exports = router;
