const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var TelegramGroupRightsController = {
    getGroupRights: function(req, res){
        db.sequelize.query('CALL getGroupMembersRightsByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteRight: function(req, res){
        let deleteId = parseInt(req.params.id);
        if (!Number.isInteger(deleteId)){
            console.log('[deleteRight] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL deleteTgSpecialRightByUserId(:userId, :tgId);', 
        {   replacements: {
            userId: req.user.target_user_id,
            tgId: deleteId
        },
        }).then(function(result){
            botHelper.syncUpdateTgMemberRight(null, req.user.target_user_id).then(function(response){
                console.log(response)
            }).catch(function(err){
                console.log(err.statusCode)
            });

            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }
};

module.exports = TelegramGroupRightsController;