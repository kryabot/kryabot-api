var express = require('express');
var router = express.Router();
var translationController = require('../controllers/public/traslationController');
var callbackController = require('../controllers/public/callbackController');
var globalEventController = require('../controllers/public/globalEventController');
var statusController = require('../controllers/public/statusController');

router.get('/translations', translationController.getTranslations);
router.get('/translations/:lang', translationController.getLangTranslations);
router.get('/callback/twitch_subs', callbackController.confirmTwitchWebhook);
router.get('/callback/twitch_streams', callbackController.confirmTwitchWebhook);
router.get('/events/easter', globalEventController.redirectDisabled);
router.get('/events/halloween', globalEventController.getEventTopHalloween);
router.get('/status/ping', statusController.getPingInformation);
router.get('/status/startup', statusController.getStartupInformation);
router.post('/callback/twitch_events', callbackController.handleTwitchEventsub);

module.exports = router;
