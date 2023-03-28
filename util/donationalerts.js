var request = require('request-promise');
var configs = require('../config/api_config');

module.exports = class DonationAlert {
    constructor(){
        this.loadCofing();
    }

    getType(){
        return this.type;
    }

    loadCofing(){
        this.config = configs.donationalerts;
        this.type = 'DA';
    }

    async login(code){
        let generateToken = JSON.parse(await this.getTokenByCode(code));
        if(!generateToken || !generateToken.access_token){
            return { tokenData: generateToken, validateData: null , success: false}
        }

        let validateToken = await this.validateToken(generateToken.access_token);
        let successCheck = false;
        if(validateToken && validateToken.hasOwnProperty('data')){
            successCheck = true
        }
        
        return { tokenData: generateToken, validateData: validateToken, success: successCheck}
    }

    async validateToken(token){
        let header = {
            'Authorization': 'Bearer ' + token
        };

        let url = 'https://www.donationalerts.com/api/v1/user/oauth';

        return await request.get({url: url, headers: header}).json();
    }

    async getTokenByCode(code){
        let header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let properties = {
            grant_type: 'authorization_code',
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            redirect_uri: this.config.callback_url,
            code: code
        };

        let url = this.config.base_url + 'token';
        return await request.post({url:url, form:properties, headers: header});
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
    
};