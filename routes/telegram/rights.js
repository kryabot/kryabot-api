var express = require('express');
var router = express.Router();
var groupRightsController = require('../../controllers/telegram/groupRightsController');

router.get('/', groupRightsController.getGroupRights);
router.delete('/:id', groupRightsController.deleteRight);

module.exports = router;
