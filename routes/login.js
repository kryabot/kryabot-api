var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth/authController');
var inviteController = require('../controllers/telegram/inviteController');

let formatResponse = function(loginData){
  let tmp = loginData.tokenData;
  tmp.refresh_token = null;
  return tmp
};

router.get('/access', function(req, res, next) {
  let code = req.query.code;
  if(!code || !code.trim()){
    res.status(422);
    res.send();
    return;
  }

  authController.loginAccess(code)
  .then(function(loginData){
    res.send(formatResponse(loginData))
  }).catch(function(err){
    console.log(err)
  });
});

router.get('/web', function(req, res, next) {
  let code = req.query.code;
  if(!code || !code.trim()){
    res.status(422);
    res.send();
    return;
  }

  authController.loginWeb(code)
  .then(function(loginData){
    if(loginData.success == true && loginData.access == true){
      res.send(formatResponse(loginData))
    } else {

      let resp = {error: {error_description: "401"}};
      res.status(401);
      res.send(resp);
    }
  }).catch(function(err){
    console.log(err)
  });
});

router.get('/webdev', function(req, res, next) {
  let code = req.query.code;
  if(!code || !code.trim()){
    res.status(422);
    res.send();
    return;
  }

  authController.loginWebDev(code)
  .then(function(loginData){
    if(loginData.success == true && loginData.access == true){
      res.send(formatResponse(loginData))
    } else {

      let resp = {error: {error_description: "401"}};
      res.status(401);
      res.send(resp);
    }
  }).catch(function(err){
    console.log(err)
  });
});

router.get('/telegram', inviteController.verifyLogin);



router.get('/da-access', function(req, res, next) {
  let code = req.query.code;
  if(!code || !code.trim()){
    res.status(422);
    res.send();
    return;
  }

  authController.loginDonationAlerts(code)
  .then(function(loginData){
    console.log(loginData);
    if(loginData.tokenData && loginData.tokenData.access_token){
      res.send(formatResponse(loginData))
    }
  }).catch(function(err){
    console.log(err);
    res.status(500);
    res.send(err.response.body)
  });
});

module.exports = router;
