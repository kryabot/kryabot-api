var express = require('express');
var router = express.Router();
var awardController = require('../../controllers/telegram/awardController');

router.get('/', awardController.getAwards);
router.post('/', awardController.saveAward);
router.delete('/:id', awardController.deleteAward);
router.delete('/', awardController.deleteAllAwards);
module.exports = router;
