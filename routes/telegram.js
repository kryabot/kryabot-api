var express = require('express');
var router = express.Router();

const groupRoute = require('./telegram/group');
const membersRoute = require('./telegram/members');
const rightsRoute = require('./telegram/rights');
const mediaRoute = require('./telegram/bannedmedia');
const wordRoute = require('./telegram/bannedword');
const awardRoute = require('./telegram/award');
const statsRoute = require('./telegram/stats');

router.use('/group', groupRoute);
router.use('/members', membersRoute);
router.use('/rights', rightsRoute);
router.use('/media', mediaRoute);
router.use('/word', wordRoute);
router.use('/award', awardRoute);
router.use('/stats', statsRoute);

module.exports = router;