const db = require('../../models');
const errorHandler = require('../../util/catch');

var TelegramGroupStatsController = {
    getStats: function(req, res){
        db.sequelize.query('CALL getTgStatsByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    getLastUserStats: function(req, res){
        db.sequelize.query('CALL getTgUserLastStatsByUserId(:userId);', 
        {   replacements: {userId: req.user.target_user_id},
        }).then(function(result){
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });

    },
};

module.exports = TelegramGroupStatsController;