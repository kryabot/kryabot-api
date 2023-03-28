const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var validActionEnum = ['TWITCH_SUBMOD_ON', 
                        'TWITCH_SUBMOD_OFF', 
                        'TWITCH_MESSAGE', 
                        'TWITCH_MUTE_SELF', 
                        'TWITCH_MUTE_OTHER', 
                        'TG_MUTE_SELF', 
                        'TG_MUTE_OTHER', 
                        'TG_MESSAGE', 
                        'TG_AWARD'];

var RewardController = {
    getPointRewards: function (req, res){
        db.sequelize.query('CALL getChannelPointRewardsByUserId(:userId);', 
         {  replacements: {
                userId: req.user.target_user_id
            },
        }).then(function(result){
            res.send(result)
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    savePointReward: function(req, res){
        /* Validate body values before saving */
        if(req.body.channel_point_action_id && !Number.isInteger(req.body.channel_point_action_id)){
            console.log('[savePointReward] Bad channel_point_action_id value for user ' + req.user.target_user_id + ': ' + req.body.channel_point_action_id);
            res.status(422);
            res.send();
            return;
        }

        if (!Number.isInteger(req.body.amount)){
            console.log('[savePointReward] Bad amount value for user ' + req.user.target_user_id + ': ' + req.body.amount);
            res.status(422);
            res.send();
            return;
        }

        if (!Number.isInteger(req.body.enabled) || (req.body.enabled != 0 && req.body.enabled != 1)){
            console.log('[savePointReward] Bad enabled value for user ' + req.user.target_user_id + ': ' + req.body.enabled);
            res.status(422);
            res.send();
            return;
        }
        
        if (!validActionEnum.includes(req.body.action)){
            console.log('[savePointReward] Bad action value for user ' + req.user.target_user_id + ': ' + req.body.action);
            res.status(422);
            res.send();
            return;
        }

        if (!req.body.title || req.body.title === ''){
            console.log('[savePointReward] Bad title value for user ' + req.user.target_user_id + ': ' + req.body.title);
            res.status(422);
            res.send();
            return;
        }


        db.sequelize.query('CALL savePointRewardByUserId(:userId, :rewardId, :rewardAction, :rewardTitle, :rewardData, :rewardAmount, :rewardEnabled, :rewardParentId, @sta);', 
         {  replacements: {
                userId: req.user.target_user_id,
                rewardId: req.body.channel_point_action_id || 0,
                rewardAction: req.body.action,
                rewardTitle: req.body.title,
                rewardData: req.body.data || '',
                rewardAmount: req.body.amount,
                rewardEnabled: req.body.enabled,
                rewardParentId: 0
            },
        }).then(function(result){
            botHelper.syncUpdatePointReward(null, req.user.target_user_id).then(function(response){
                //console.log(response)
            }).catch(function(err){
                console.log(err.statusCode + ' in bot sync savePointReward')
            });
            RewardController.getPointRewards(req, res)
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deletePointReward: function(req, res){
        let deleteId = parseInt(req.params.id);

        if (!Number.isInteger(deleteId)){
            console.log('[deletePointReward] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL deletePointRewardByUserId(:userId, :rewardId, @sta);', 
        {  replacements: {
               userId: req.user.target_user_id,
               rewardId: deleteId,
           },
       }).then(function(result){
            botHelper.syncUpdatePointReward(null, req.user.target_user_id).then(function(response){
                console.log(response)
            }).catch(function(err){
                console.log(err.statusCode + ' in bot sync deletePointReward')
            });

            res.send();
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }
};

module.exports = RewardController;