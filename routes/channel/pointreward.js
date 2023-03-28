var express = require('express');
var router = express.Router();
var rewardController = require('../../controllers/channel/rewardController');

router.get('/', rewardController.getPointRewards);
router.post('/', rewardController.savePointReward);
router.delete('/:id', rewardController.deletePointReward);

module.exports = router;
