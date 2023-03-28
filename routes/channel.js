var express = require('express');
var router = express.Router();

const channelRoute = require('./channel/channel');
const commandRoute = require('./channel/command');
const noticeRoute = require('./channel/notice');
const rewardRoute = require('./channel/pointreward');
const permissionRoute = require('./channel/permission');
const chatRoute = require('./channel/chat')

router.use('/', channelRoute);
router.use('/command', commandRoute);
router.use('/notice', noticeRoute);
router.use('/pointreward', rewardRoute);
router.use('/permission', permissionRoute);
router.use('/chat', chatRoute);

module.exports = router;
