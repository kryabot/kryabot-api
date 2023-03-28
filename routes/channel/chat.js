var express = require('express');
var router = express.Router();
var ChatController = require('../../controllers/channel/chatController');

router.get('/', ChatController.getChatMessages);
router.post('/timeout', ChatController.twitchTimeout);
router.post('/unban', ChatController.twitchUnban);

module.exports = router;
