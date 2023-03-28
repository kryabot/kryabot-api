const whitelist = ['https://my.krya.dev', 'https://tg.krya.dev', 'https://spambots.krya.dev', 'https://pumpkins.krya.dev', 'https://status.krya.dev'];
const corsOptions = {
  origin: function(origin, callback) {
    if (origin == null || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS:' + origin))
    }
  }
};

module.exports = corsOptions;
