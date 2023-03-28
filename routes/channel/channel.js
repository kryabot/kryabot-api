var express = require('express');
var router = express.Router();
var ChannelConstroller = require('../../controllers/channel/channelController');

router.get('/all', ChannelConstroller.getAllChannels);
router.get('/', ChannelConstroller.getChannel);
router.post('/', ChannelConstroller.saveChannel);

module.exports = router;
