const telegramGroup = require('../../models').channel_subchat;
const channel = require('../../models').channel;
const db = require('../../models');
const errorHandler = require('../../util/catch');
const KryaBot = require('../../util/kryabot');

var botHelper = new KryaBot();

var TelegramGroupController = {
    getGroup: function(req, res){
        channel.findOne({
            attributes: ['channel_id'],
            where: { user_id: req.params.id || req.user.target_user_id },
            raw: true
        })
        .then(function(result){
            if (result){ 
                //console.log(result);
                telegramGroup.findOne({
                    where: { channel_id:  result.channel_id},
                    raw: true
                })
                .then(function(result){
                    res.send(result);
                }).catch(function(err){
                    errorHandler(err, req, res)
                });
            }
        });
    },
    setGroup: function(req, res){
        db.sequelize.query('select getTelegramGroupIdByUserId(:userId) as "val";', 
        {   replacements: {userId: req.user.target_user_id},
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(result => {
            let ignoredFields = ['channel_subchat_id', 'channel_id', 'tg_chat_id', 'tg_chat_name', 'last_member_refresh', 'refresh_status', 'last_auto_kick'];
            if (result && result[0]) {
                /* Avoid overwrite of read only fields */
                Object.keys(req.body).forEach((key) => (req.body[key] == null || ignoredFields.indexOf(key) >= 0) && delete req.body[key]);

                telegramGroup.update(req.body, {
                    where: { channel_subchat_id: result[0].val },
                })
                .then(function(resultUpdate){
                    telegramGroup.findOne({ where: { channel_subchat_id: result[0].val}}).then(function(updatedRecord){
                        if(req.body.link_changed) {
                            botHelper.joinTelegramChannel(req.query.access_token, req.user.target_user_id)
                            .then(function(botResp){
                                console.log(botResp)
                            }).catch(function(err){
                                console.log(err)
                            });
                        } else {
                            botHelper.syncUpdateTgGroup(req.query.access_token, req.user.target_user_id)
                            .then(function(botResp){
                                console.log(botResp)
                            }).catch(function(err){
                                console.log(err)
                            });
                        }
                        res.send(updatedRecord)
                    }).catch(function(err){
                        errorHandler(err, req, res)
                    });
                }).catch(function(err){
                    errorHandler(err, req, res)
                });
            }
        });
    }
}

module.exports = TelegramGroupController;