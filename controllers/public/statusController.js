const redis = require('../../util/kryaRedis')

class Response{
    constructor() {
        this.telegramInfobot = null
        this.twitchTmi = null
        this.webserver = null
        this.telegramInfomanager = null
        this.telegramAuthbot = null
        this.twitchSpamDetector = null
        this.twitchBot = null
        this.telegramBot = null
    }

    setValue(key, value){
        throw new Error("Not implemented setValue")
    }

    parse(val){
        return val
    }
}

class PingResponse extends Response{
    constructor() {
        super();
    }
    setValue(key, value){
        switch(key) {
            case 'general.ping.INFOBOT_TELEGRAM':
                this.telegramInfobot = this.parse(value);
                break;
            case 'general.ping.KRYABOT_TMI':
                this.twitchTmi = this.parse(value);
                break;
            case 'general.ping.WEBSERVER':
                this.webserver = this.parse(value);
                break;
            case 'general.ping.INFOMANAGER':
                this.telegramInfomanager = this.parse(value);
                break;
            case 'general.ping.AUTHBOT_TELEGRAM':
                this.telegramAuthbot = this.parse(value);
                break;
            case 'general.ping.KRYABOT_SPAM_DETECTOR':
                this.twitchSpamDetector = this.parse(value);
                break;
            case 'general.ping.KRYABOT_TWITCH':
                this.twitchBot = this.parse(value);
                break;
            case 'general.ping.KRYABOT_TELEGRAM':
                this.telegramBot = this.parse(value);
                break;
            default:
                break;
        }
    }
}

class StartupResponse extends Response{
    constructor() {
        super();
    }
    parse(val){
        if (val){
            let parsed = JSON.parse(val)
            return parsed.when
        }
        return val
    }
    setValue(key, value){
        switch(key) {
            case 'general.startup.INFOBOT_TELEGRAM':
                this.telegramInfobot = this.parse(value);
                break;
            case 'general.startup.KRYABOT_TMI':
                this.twitchTmi = this.parse(value);
                break;
            case 'general.startup.WEBSERVER':
                this.webserver = this.parse(value);
                break;
            case 'general.startup.INFOMANAGER':
                this.telegramInfomanager = this.parse(value);
                break;
            case 'general.startup.AUTHBOT_TELEGRAM':
                this.telegramAuthbot = this.parse(value);
                break;
            case 'general.startup.KRYABOT_SPAM_DETECTOR':
                this.twitchSpamDetector = this.parse(value);
                break;
            case 'general.startup.KRYABOT_TWITCH':
                this.twitchBot = this.parse(value);
                break;
            case 'general.startup.KRYABOT_TELEGRAM':
                this.telegramBot = this.parse(value);
                break;
            default:
                break;
        }
    }
}


async function collectData(key_like, responseType){
    let response = new responseType()

    let keys = await redis.keysAsync(key_like)
    await Promise.all(keys.map(async (key) => {
        let val = await redis.getAsync(key);
        response.setValue(key, val)
    }))
    return JSON.stringify(response)
}

async function collectPingStatus(){
    return await collectData('general.ping.*', PingResponse)
}

async function collectStartupInformation(){
    return await collectData('general.startup.*', StartupResponse)
}


var StatusController = {
    getPingInformation: function (req, res){
        collectPingStatus().then(function (data) {
            res.send(data);
        });
    },
    getStartupInformation: function (req, res){
        collectStartupInformation().then(function (data) {
            res.send(data);
        });
    },

};

module.exports = StatusController;
