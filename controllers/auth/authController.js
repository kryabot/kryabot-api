const db = require('../../models');
const Twitch = require('../../util/twitch');
const DonationAlert = require('../../util/donationalerts');

var twitchHelper = new Twitch();
var daHelper = new DonationAlert();

async function saveAuth(loginData, helper){
    if(!loginData.success){
        return
    }

    let authType = helper.getType();
    let scopes = '';
    if (loginData.tokenData.scope) {
        scopes = loginData.tokenData.scope.join(' ');
    }
    await db.sequelize.query('CALL insertAuthByUserId(:twId, :type, :authToken, :authRefreshToken, :authExpiresIn, :authScope);', 
    {   replacements: {
        twId: loginData.validateData.user_id,
        type: authType,
        authToken: loginData.tokenData.access_token,
        authRefreshToken: loginData.tokenData.refresh_token,
        authExpiresIn: loginData.tokenData.expires_in,
        authScope: scopes,
    }});
}

async function checkChannelAccess(loginData){
    if(!loginData.success){
        return loginData
    }

    let check = await db.sequelize.query('CALL getTwitchWebLogin(:twitchId);',
    {   replacements: {
        twitchId: loginData.validateData.user_id
    }});
    console.log(check)
    if(check && check[0] && check[0].allow_web_access == true){
        return loginData
    }

    let rights = await db.sequelize.query('CALL getSudoListForWeb(:userId)',
        {   replacements: {
            userId: check[0].user_id
        }})

    if (rights.length > 0){
        return loginData
    }

    loginData.access = false;
    return loginData
}

/* Login via Twitch for different purposes. Apply different settings for different purposes */
var authController = {
    loginTelegram: async function(code){
        twitchHelper.setConfigTelegram();
        let loginData = await twitchHelper.login(code);
        await saveAuth(loginData, twitchHelper);
        return loginData
    },
    loginAccess: async function(code){
        twitchHelper.setConfigBot();
        let loginData = await twitchHelper.login(code);
        await saveAuth(loginData, twitchHelper);
        return loginData
    },
    loginWeb: async function(code){
        twitchHelper.setConfigWebProd();
        let loginData = await twitchHelper.login(code);
        await saveAuth(loginData, twitchHelper);
        await checkChannelAccess(loginData);
        return loginData
    },
    loginWebDev: async function(code){
        twitchHelper.setConfigWebDev();
        let loginData = await twitchHelper.login(code);
        await saveAuth(loginData, twitchHelper);
        await checkChannelAccess(loginData);
        return loginData
    },
    loginDonationAlerts: async function(code){
        let loginData = await daHelper.login(code);
        await saveAuth(loginData, daHelper);
        return loginData
    },
};

module.exports = authController;