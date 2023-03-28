var express = require('express');
var router = express.Router();
var groupMembersController = require('../../controllers/telegram/groupMembersController');

router.get('/', groupMembersController.getGroupMembers);
router.post('/refresh', groupMembersController.refreshGroupMembers);
router.post('/masskick', groupMembersController.startMassKick);

module.exports = router;
