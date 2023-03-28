var express = require('express');
var router = express.Router();
var PermissionController = require('../../controllers/channel/permissionController');

router.get('/', PermissionController.getActivePermissions);
router.delete('/:tokenType', PermissionController.deletePermission);

module.exports = router;
