var TwitchTokenStrategy = require('./twitch-passport-token').TwitchTokenStrategy;
var models = require('./../../models');
const errorHandler = require('../../util/catch');

module.exports = new TwitchTokenStrategy({
    clientID: 'kqlu3roeeqsnkc4i12xgv3dlwrlztu',
    clientSecret: '',
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, next) {
    let target_id = parseInt(req.query.target_id);
    models.sequelize.query('CALL getTwitchWebLogin(:twitchId);',
        {  replacements: {
            twitchId: profile.id
          },
        }).then(function(user){
          if(user){
            user.profile = profile;
            user.sudo = []
            user.target_user_id = user[0].user_id
            user.id = user[0].user_id
            user.channelId = user[0].channel_id
            user.channelName = user[0].name
            models.sequelize.query('CALL getSudoListForWeb(:userId);',
                { replacements: {userId: user[0].user_id }
                }).then(function (rights) {
                if(rights){
                  user.sudo = rights
                }

                if(target_id != null && target_id > 0 && target_id !== user.target_user_id) {
                  let has_target_access = false
                  user.sudo.forEach(function (access) {
                    if (access.user_id === target_id) {
                      user.target_user_id = access.user_id
                      user.channelId = access.channel_id
                      user.channelName = access.channel_name
                      has_target_access = true;
                    }
                  });

                  /* Provided target ID, but has no rights to access it */
                  if (!has_target_access){
                    console.log(`Bad request, user ${user[0].user_id} Provided target ID ${target_id}, but has no rights to access it`);
                    return next(null, false);
                  }
                } else {
                    if (!user[0].allow_web_access && !req.socket.parser.incoming.originalUrl.startsWith('/auth/user')) {
                        return next(null, false);
                    }
                }

                if(user[0].allow_web_access || user.sudo.length > 0){
                  return next(null, user);
                }
              console.log(`Bad request, user ${user[0].user_id} has no access to request`);
              return next(null, false);
            });
          } else {
            console.log(`Bad request, user with twitch ID ${profile.id} not found in database`);
            return next(null, false);
          }
    }).catch(function(err){
      errorHandler(err, req, profile)
    });
  });
