var request = require('request-promise');

module.exports = class KryaBot {
    constructor(){
        this.defaultToken = '$BACKEND_TOKEN';
        this.baseUrl = 'http://$BACKEND_HOSTNAME:$BACKEND_PORT/';
        this.tgUrl = this.baseUrl + 'tg/';
        this.twUrl = this.baseUrl + 'twitch/';
    }

    async joinTelegramChannel(token, userId){
        let properties = {
            token: token || this.defaultToken,
            user_id: userId
        };

        let url = this.tgUrl + 'join_group';

        return await request.get({url:url, qs:properties}).json();
    }

    async refreshGroupMembers(token, userId){
        let properties = {
            token: token || this.defaultToken,
            user_id: userId
        };

        let url = this.tgUrl + 'refresh-group-members';

        return await request.get({url:url, qs:properties}).json();
    }

    async updateAllData(token){
        let properties = {
            token: token || this.defaultToken
        };

        let url = this.tgUrl + 'update';

        return await request.get({url:url, qs:properties}).json();
    }

    async updateUserData(token, userId){
        let properties = {
            token: token || this.defaultToken,
            user_id: userId
        }
    }

    async startGroupMassKick(token, userId, params){
        let properties = {
            token: token || this.defaultToken,
            user_id: userId
        };

        let url = this.tgUrl + 'mass_kick';
        return await request.post({url:url, qs: properties}).json(params);
    }

    async updateSpecialRights(token, userId){
        let properties = {
            token: token || this.defaultToken,
            user_id: userId
        };

        let url = this.tgUrl + 'update_special_rights';

        return await request.get({url:url, qs:properties}).json();
    }

    async reportUnsubscribe(eventId){
        let properties = {
            token: this.defaultToken,
            event_id: eventId
        };
        let url = this.twUrl + 'report_unsub';
        return await request.get({url:url, qs:properties}).json();
    }

    async sendStreamData(payload){
        let properties = {
            token: this.defaultToken,
        };
        let url = this.twUrl + 'stream_update';
        return await request.post({url:url, qs:properties}).json(payload);
    }

    async sync(token, userId, type){
        let properties = {
            token: token || this.defaultToken,
            userId: userId,
            topic: type
        };

        let url = this.baseUrl + 'sync';

        return await request.get({url:url, qs:properties}).json();
    }

    async syncUpdateCommand(token, userId){
        return await this.sync(token, userId, 'twitch_command');
    }

    async syncUpdateChannel(token, userId){
        return await this.sync(token, userId, 'twitch_channel');
    }

    async syncUpdateNotice(token, userId){
        return await this.sync(token, userId, 'twitch_notice');
    }

    async syncUpdatePointReward(token, userId){
        return await this.sync(token, userId, 'twitch_point_reward');
    }

    async syncUpdateBannedMedia(token, userId){
        return await this.sync(token, userId, 'telegram_banned_media');
    }

    async syncUpdateBannedWords(token, userId){
        return await this.sync(token, userId, 'telegram_banned_words');
    }

    async syncUpdateTgMemberRight(token, userId){
        // return await this.updateSpecialRights(token, userId)
        return await this.sync(token, userId, 'telegram_member_rights');
    }

    async syncUpdateTgAward(token, userId){
        return await this.sync(token, userId, 'telegram_award');
    }

    async syncUpdateTgGroup(token, userId){
        return await this.sync(token, userId, 'telegram_group');
    }

    async reportError(errorMessage, userId){
        let properties = {
            token: this.defaultToken,
            userId: userId
        };

        let body = {
            error: {
                source: 'API',
                message: errorMessage
            }
        };

        let url = this.tgUrl + 'error_report';

        return await request.post({url:url, qs:properties}).json(body);
    }

    async twitchActionTimeout(token, userId, channel, users, reason, duration){
        let properties = {
            token: token || this.defaultToken,
            userId: userId
        };

        let url = this.twUrl + 'actions/timeout';

        let body = {
            users: users,
            channel: channel,
            duration: duration,
            reason: reason
        };

        return await request.post({url:url, qs:properties}).json(body);
    }

    async twitchActionUnban(token, userId, channel, users){
        let properties = {
            token: token || this.defaultToken,
            userId: userId
        };

        let url = this.twUrl + 'actions/unban';

        let body = {
            users: users,
            channel: channel
        };

        return await request.post({url:url, qs:properties}).json(body);
    }

    async forwardTwitchEvent(event){
        let properties = {
            token: this.defaultToken,
        };
        let url = this.twUrl + 'event/handle';
        return await request.post({url:url, qs:properties}).json(event);
    }
};
