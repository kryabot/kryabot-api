const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();


var TelegramGroupMembersController = {
    getGroupMembers: function(req, res){
        db.sequelize.query('CALL getTgGroupMembersByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            res.send(result);
        });
    },
    refreshGroupMembers: function(req, res){
        botHelper.refreshGroupMembers(req.query.access_token, req.user.target_user_id)
        .then(function(result){
            console.log('refresh result: ' + result);
            return res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    startMassKick: function(req, res){
        botHelper.startGroupMassKick(req.query.access_token, req.user.target_user_id, req.body)
        .then(function(result){
            return res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }
};

module.exports = TelegramGroupMembersController;