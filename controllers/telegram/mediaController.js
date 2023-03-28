const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var TelegramGroupMediaController = {
    getBannedMedia: function(req, res){
        db.sequelize.query('CALL getTgBannedMediaByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteBannedMedia: function(req, res){
        let error = {};
        let deleteId = parseInt(req.params.id);
        if (!Number.isInteger(deleteId)){
            console.log('[deleteMedia] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            error.error = 'Incorrect id value!';
            res.status(422);
            res.send(error);
            return;
        }

        db.sequelize.query('CALL deleteBannedMediaByUserId(:userId, :tgId);', 
        {   replacements: {
            userId: req.user.target_user_id,
            tgId: deleteId
        },
        }).then(function(result){
            res.send(result);
            botHelper.syncUpdateBannedMedia(null, req.user.target_user_id).then(function(response){
                console.log(response)
            }).catch(function(err){
                console.log(err.statusCode)
            });
            
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteAllBannedMedia: function(req, res){
        db.sequelize.query('CALL deleteAllBannedMediaByUserId(:userId);', 
        {   replacements: {
            userId: req.user.target_user_id,
        },
        }).then(function(result){
            res.send(result);

            botHelper.syncUpdateBannedWords(null, req.user.target_user_id).then(function(response){
                console.log(response)
            }).catch(function(err){
                console.log(err.statusCode)
            });
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }

};

module.exports = TelegramGroupMediaController;
