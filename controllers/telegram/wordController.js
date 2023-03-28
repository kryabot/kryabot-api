const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var TelegramGroupWordController = {
    getBannedWords: function(req, res){
        db.sequelize.query('CALL getTgBannedWordsByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            if(result){
                result = result.filter(row => row.tg_word_id != null)
            }
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteBannedWord: function(req, res){
        let deleteId = parseInt(req.params.id);
        if (!Number.isInteger(deleteId)){
            console.log('[deleteWord] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL deleteBannedWordByUserId(:userId, :wordId);', 
        {   replacements: {
            userId: req.user.target_user_id,
            wordId: deleteId
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
    },
    deleteAllBannedWords: function(req, res){
        db.sequelize.query('CALL deleteAllBannedWordsByUserId(:userId);', 
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

module.exports = TelegramGroupWordController;