var config = {
    web_prod: {
        client_id: '$WEB_PROD_TWITCH_CLIENT_ID',
        client_secret: '$WEB_PROD_TWITCH_CLIENT_SECRET',
        callback_url: 'https://my.krya.dev/auth/callback',
        base_url: 'https://id.twitch.tv/oauth2/'
    },
    web_dev:{
        client_id: '$WEB_DEV_TWITCH_CLIENT_ID',
        client_secret: '$WEB_DEV_TWITCH_CLIENT_SECRET',
        callback_url: 'http://192.168.0.170:4200/auth/callback',
        base_url: 'https://id.twitch.tv/oauth2/'
    },
    bot:{
        client_id: '$BOT_AUTH_TWITCH_CLIENT_ID',
        client_secret: '$BOT_AUTH_TWITCH_CLIENT_SECRET',
        callback_url: 'https://my.krya.dev/access/callback',
        base_url: 'https://id.twitch.tv/oauth2/'
    },
    telegram:{
        client_id: '$TG_WEB_TWITCH_CLIENT_ID',
        client_secret: '$TG_WEB_TWITCH_CLIENT_SECRET',
        callback_url: 'https://tg.krya.dev/twitch',
        base_url: 'https://id.twitch.tv/oauth2/'
    },
    telegram_dev:{
        client_id: '$TG_WEB_DEV_TWITCH_CLIENT_ID',
        client_secret: '$TG_WEB_DEV_TWITCH_CLIENT_SECRET',
        callback_url: 'https://tg.krya.dev/twitch',
        base_url: 'https://id.twitch.tv/oauth2/'
    },
    donationalerts:{
        client_id: '$DA_CLIENT_ID',
        client_secret: '$DA_CLIENT_SECRET',
        callback_url: 'https://my.krya.dev/da-access/callback',
        base_url: 'https://www.donationalerts.com/oauth/'
    }
}

module.exports = config;
