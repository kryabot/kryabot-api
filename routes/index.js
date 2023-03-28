var express = require('express');
var router = express.Router();

var usersRouter = require('../routes/users');
var channelRouter = require('../routes/channel');
var telegramRouter = require('../routes/telegram');

router.use('/user', usersRouter);
router.use('/channel', channelRouter);
router.use('/telegram', telegramRouter);

module.exports = router;
