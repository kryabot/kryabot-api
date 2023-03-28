// token generation for Twitch login
var request = require('request-promise');
var configs = require('../config/api_config');

module.exports = class Twitch {
    constructor(){
        this.setConfigWebProd();
        this.helix = 'https://api.twitch.tv/helix/'
    }

    getType(){
        return this.type;
    }

    setConfigTelegram(){
        this.config = configs.telegram;
        this.type = 'TGAUTH';
    }

    setConfigTelegramDev(){
        this.config = configs.telegram_dev;
        this.type = 'TGAUTH';
    }

    setConfigBot(){
        this.config = configs.bot;
        this.type = 'BOT';
    }

    setConfigWebDev(){
        this.config = configs.web_dev;
        this.type = 'WEB';
    }

    setConfigWebProd(){
        this.config = configs.web_prod;
        this.type = 'WEB';
    }

    async login(code){
        let generateToken = await this.getTokenByCode(code);
        if(!generateToken || !generateToken.access_token){
            return { tokenData: generateToken, validateData: null , success: false}
        }
        
        let validateToken = await this.validateToken(generateToken.access_token);
        let successCheck = false;
        if(validateToken && validateToken.hasOwnProperty('user_id')){
            successCheck = true
        }

        return { tokenData: generateToken, validateData: validateToken, success: successCheck, access: true}
    }

    async validateToken(token){
        let header = {
            'Authorization': 'OAuth ' + token
        };

        let url = this.config.base_url + 'validate';

        return await request.get({url: url, headers: header}).json();
    }

    async getTokenByCode(code){
        let properties = {
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: this.config.callback_url
        };

        let url = this.config.base_url + 'token';
        return await request.post({url:url, qs:properties}).json();
    }

    async refreshToken(refreshToken){
        let properties = {
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        };

        let url = this.config.base_url + 'token';

        return await request.post({url:url, qs:properties}).json();
    }

    async getUserData(token){

    }
    
    /* Endpoint with user token */
    async getSubcriberDataByUser(token, channelTwitchId, userTwitchId){
        let header = {
            'Accept': 'application/json',
            'Client-ID': this.config.client_id,
            'Authorization': 'Bearer ' + token
        };

        let url = this.helix + 'subscriptions/user'
        let properties = {
            broadcaster_id: channelTwitchId,
            user_id: userTwitchId,
        };

        try {
            return await request.get({url: url, headers: header, qs: properties}).json()
        } catch (e){
            if (e.statusCode != 404)
                console.log(e);
            return null
        }
    }
};
