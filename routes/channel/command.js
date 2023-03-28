var express = require('express');
var router = express.Router();
var CommandConstroller = require('../../controllers/channel/commandController');

router.get('/', CommandConstroller.getCommands);
router.post('/', CommandConstroller.saveCommand);
router.delete('/:id', CommandConstroller.deleteCommand);

module.exports = router;
