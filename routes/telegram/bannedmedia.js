var express = require('express');
var router = express.Router();
var mediaController = require('../../controllers/telegram/mediaController');

router.get('/', mediaController.getBannedMedia);
router.post('/', mediaController.deleteAllBannedMedia);
router.delete('/:id', mediaController.deleteBannedMedia);

module.exports = router;
