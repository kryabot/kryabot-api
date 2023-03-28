const Channel = require('../../models').channel;
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var ChannelController = {
    getAllChannels: function (req, res){
        Channel.findAll({ raw: true })
        .then(function(result){
            res.send(result);
        })
    },
    getChannel: function(req, res){
        Channel.findOne({
            where: { user_id: req.params.id || req.user.target_user_id },
            raw: true
        })
        .then(function(result){
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    saveChannel: function(req, res){
        Channel.findOrCreate({
            where: { user_id: req.user.target_user_id },
            defaults:{
                auto_join: 0,
                user_id: req.user.target_user_id,
                channel_name: req.user.profile.username
            }
        })
        .then(function(dbChannel){
            let auto_join = req.body.auto_join ? 1 : 0;

            if (!Number.isInteger(auto_join)){
                console.log('[saveChannel] Bad auto_join value for user ' + req.body.auto_join + ': ' + auto_join);
                res.status(422);
                res.send();
                return;
            }

            Channel.update({
                auto_join: auto_join,
            }, {where: { user_id: req.user.target_user_id }}).then(function(updateResult){
                if (updateResult[0] == 1){
                    /* Updated of record done, push sync to bot */
                    botHelper.syncUpdateChannel(null, req.user.target_user_id).then(function(response){
                        //console.log(response)
                    }).catch(function(err){
                        console.log(err.statusCode)
                    });
                }
                Channel.findOne({where: { user_id: req.user.target_user_id }, raw: true}).then(function(dbChannel){
                    res.send(dbChannel)
                }).catch(function(err){
                    errorHandler(err, req, res)
                });
                // res.send(updateResult)
            }).catch(function(err){
                errorHandler(err, req, res)
            });
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }
};

module.exports = ChannelController;
