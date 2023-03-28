var express = require('express');
var router = express.Router();
var noticeController = require('../../controllers/channel/noticeController');

router.get('/', noticeController.getNotices);
router.post('/', noticeController.saveNotice);
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;
