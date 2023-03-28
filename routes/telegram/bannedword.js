var express = require('express');
var router = express.Router();
var wordController = require('../../controllers/telegram/wordController');

router.get('/', wordController.getBannedWords);
router.post('/', wordController.deleteAllBannedWords);
router.delete('/:id', wordController.deleteBannedWord);

module.exports = router;
