const KryaBot = require('../../util/kryabot');

const backendRedis = require('../../util/kryaRedis')

var botHelper = new KryaBot();

var CallbackController = {
    handleTwitchEventsub: async function (req, res){
        const status = req.body.subscription.status
        const topic = req.body.subscription.type

        switch (status) {
            case 'webhook_callback_verification_pending':
                var challenge = req.body.challenge
                var userId = req.body.subscription.condition.broadcaster_user_id

                console.log(`Confirming TwitchEventSub ${topic} challenge for user ${userId}: ${challenge}`)
                res.send(challenge);
                break;
            default:
                if (!req.twitch_verified) {
                    console.log(`[${new Date()}][Error]TwitchEventSub not verified: ${req.body} ${req.headers}`)
                    res.status(404);
                } else {
                    // var botResp = await botHelper.forwardTwitchEvent(req.body)
                    // console.log(`[${new Date()}][new]TwitchEvent forward result: ${botResp.body}`)
                    try {
                        let response = backendRedis.RPUSH('twitch-event-sub-queue', JSON.stringify(req.body))
                        console.log(response)
                    } catch(ex){
                        console.error(ex)
                        res.status(500)
                    }
                }
                res.send();
        }
    },
    confirmTwitchWebhook: function (req, res){
        console.log('confirmTwitchWebhook')
        if (req.query['hub.challenge']){
            res.send(req.query['hub.challenge']);
            console.log(`Successfully completed subscribe challange for ${req.originalUrl}`)
            return
        }

        if(req.query['hub.mode'] && req.query['hub.mode'] === 'denied'){
            botHelper.reportError(`${req.originalUrl}`);
            console.log('DENIED: ' + req.originalUrl)
        }

        res.send();
    },
};

module.exports = CallbackController;
