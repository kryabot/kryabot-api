var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let response = {};
  response.user = req.user[0];
  response.twitch_data = req.user.profile._json;
  response.sudo = req.user.sudo;
  res.send(response)
});

module.exports = router;
