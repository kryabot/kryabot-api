const db = require('../../models');
const User = require('../../models').user;
const TwitchMessage = require('../../models').twitch_message;
const errorHandler = require('../../util/catch');
const KryaBot = require('../../util/kryabot');

const botHelper = new KryaBot();

async function collectUsernames(channelId, messageList){
    const usernames = [];

    // Make sure message IDs are integers
    let messageIds = messageList.map(msg => parseInt(msg));
    messageIds = messageIds.filter(id => !Number.isNaN(id) && id > 0);
    if(messageIds.length === 0)
        return usernames;

    TwitchMessage.belongsTo(User, {foreignKey: 'user_id'});
    // Collect user IDs of messages
    const searchResult = await TwitchMessage.findAll({
        where: { channel_id: channelId, twitch_message_id: messageIds },
        include: [ { model: User, attributes: ['name', 'dname']} ],
    });

    if(!searchResult)
        return usernames;

    searchResult.forEach(result => {
        // Interested only unique name
        if(result && result.user && !usernames.includes(result.user.name)){
            usernames.push(result.user.name)
        }
    });

    return usernames
}

const ChatController = {
    getChatMessages: async function (req, res) {
        try {
            const messages = await db.sequelize.query('CALL getChatMessages(:userId);',
                { replacements: { userId: req.user.target_user_id }});

            res.send(messages);
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
    twitchTimeout: async function (req, res) {
        const messages = req.body.messages
        const duration = parseInt(req.body.duration);
        const channel = req.user.channelName
        let reason = req.body.reason;
        let error = {}
        let response = {}

        if(duration === undefined || Number.isNaN(duration) || typeof duration !== 'number' || duration < 0) {
            error.error = "Bad duration value";
            res.status(422);
            res.send(error);
            return;
        }

        if(messages === undefined || !Array.isArray(messages) || messages.length === 0) {
            error.error = "Bad messages value, array must contain at least one entry";
            res.status(422);
            res.send(error);
            return;
        }

        if(reason === undefined || typeof reason !== 'string' || reason.length === 0){
            error.error = "Bad reason value";
            res.status(422);
            res.send(error);
            return;
        }

        reason = reason + ' [' + req.user.profile.id + ']'
        const usernames = await collectUsernames(req.user.channelId, messages);
        if(usernames.length > 0){
            try{
                response = await botHelper.twitchActionTimeout(null, req.user.target_user_id, channel, usernames, reason, duration);
            } catch (e) {
                if(e.error){
                    response = { from: 'bot', error: e.error};
                } else {
                    res.status(500);
                    console.log(e);
                }
            }
        }
        res.send(response);
    },
    twitchUnban: async function (req, res) {
        const messages = req.body.messages
        const channel = req.user.channelName
        let error = {}
        let response = {}

        if(messages === undefined || !Array.isArray(messages) || messages.length === 0) {
            error.error = "Bad messages value, array must contain at least one entry";
            res.status(422);
            res.send(error);
            return;
        }

        const usernames = await collectUsernames(req.user.channelId, messages);
        if(usernames.length > 0){
            try{
                response = await botHelper.twitchActionUnban(null, req.user.target_user_id, channel, usernames);
            } catch (e) {
                if(e.error){
                    response = { from: 'bot', error: e.error};
                } else {
                    res.status(500);
                    console.log(e);
                }
            }
        }

        res.send(response);
    },
};

module.exports = ChatController;
