const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var TelegramGroupAwardController = {
    getAwards: function(req, res){
        db.sequelize.query('CALL getTgAwardsByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    saveAward: function(req, res){
        let error = {};

        if (req.body.award_key == null || req.body.award_key.trim() === ''){
            console.log('[saveAward] Bad award_key value for user ' + req.user.target_user_id + ': ' + req.body.award_key);
            error.error = 'Award key can not be empty!';
            res.status(422);
            res.send(error);
            return;
        }

        if (req.body.award_key.includes(' ')){
            console.log('[saveAward] Bad award_key value for user ' + req.user.target_user_id + ': ' + req.body.award_key);
            error.error = 'Award key can not have spaces!';
            res.status(422);
            res.send(error);
            return;
        }

        if (req.body.award_key.length > 50){
            console.log('[saveAward] Bad award_key value for user ' + req.user.target_user_id + ': ' + req.body.award_key);
            error.error = 'Award key can not be longer than 50 symbols!';
            res.status(422);
            res.send(error);
            return;
        }

        if (req.body.award_template == null || req.body.award_template.trim() === ''){
            console.log('[saveAward] Bad award_template value for user ' + req.user.target_user_id + ': ' + req.body.award_template);
            error.error = 'Award template can not be empty!';
            res.status(422);
            res.send(error);
            return;
        }

        db.sequelize.query('CALL updateTgAwardByUserId(:userId, :awardId, :awardKey, :awardTemplate, :updaterId);', 
        {   replacements: {
            userId: req.user.target_user_id,
            awardId: req.body.tg_award_id,
            awardKey: req.body.award_key,
            awardTemplate: req.body.awardTemplate,
            updaterId: req.user[0].user_id,
        },
        }).then(function(result){
            TelegramGroupAwardController.getAwards();
        });
        
    },
    deleteAward: function(req, res){
        let deleteId = parseInt(req.params.id);
        if (!Number.isInteger(deleteId)){
            console.log('[deleteAward] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL deleteTgAwardByUserId(:userId, :awardId, :deleterId);', 
        {   replacements: {
            userId: req.user.target_user_id,
            awardId: deleteId,
            deleterId: req.user[0].user_id,
        },
        }).then(function(result){
            res.send(result);
            botHelper.syncUpdateTgAward(null, req.user.target_user_id).then(function(response){
                console.log(response)
            }).catch(function(err){
                console.log(err.statusCode)
            });
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteAllAwards: function(req, res){
        db.sequelize.query('CALL deleteAllTgAwardsByUserId(:userId);', 
        {   replacements: {
            userId: req.user.target_user_id,
        },
        }).then(function(result){
            res.send(result);
            botHelper.syncUpdateTgAward(null, req.user.target_user_id).then(function(response){
                console.log(response)
            }).catch(function(err){
                console.log(err.statusCode)
            });
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }
};

module.exports = TelegramGroupAwardController;