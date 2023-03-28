const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var ChannelCommandController = {
    getCommands: function (req, res){
        /* Get commands */
        db.sequelize.query('CALL getChannelCommandsByUserId(:userId);', 
         {  replacements: {
                userId: req.user.target_user_id
            },
        }).then(function(result){
            let commands = [];
            if(result && result[0]) {
                commands = result;
            }
            res.send(commands)
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteCommand: function(req, res){
        let deleteId = parseInt(req.params.id);

        if (!Number.isInteger(deleteId)){
            console.log('[deleteCommand] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL deleteChannelCommandByUserId(:userId, :commandId, @sta);', 
         {  replacements: {
                userId: req.user.target_user_id,
                commandId: deleteId,
            },
        }).then(function(result){
            botHelper.syncUpdateCommand(null, req.user.target_user_id).then(function(response){
                //console.log(response)
            }).catch(function(err){
                console.log(err.statusCode + ' in bot sync saveCommand')
            });

            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    saveCommand: function(req, res){
        /* Validate body values before saving */
        let validActions = ['custom_reply', 'custom_whisper', 'custom_song'];
        let error = {};
        
        let levelInt = parseInt(req.body.level);
        let cooldownInt = parseInt(req.body.cooldown);
        let periodInt = parseInt(req.body.repeat_amount);

        if (validActions.indexOf(req.body.action) < 0){
            console.log('[saveCommand] Bad action value for user ' + req.user.target_user_id + ': ' + req.body.action);
            error.error = 'Incorrect action value';
            res.status(422);
            res.send(error);
            return;
        }

        if(!(typeof req.body.active === "boolean")){
            console.log('[saveCommand] Bad active value for user ' + req.user.target_user_id + ': ' + req.body.active);
            error.error = 'Incorrect active value';
            res.status(422);
            res.send(error);
            return;
        }

        if(req.body.channel_command_id && !Number.isInteger(req.body.channel_command_id)){
            console.log('[saveCommand] Bad channel_command_id value for user ' + req.user.target_user_id + ': ' + req.body.channel_command_id);
            error.error = 'Incorrect command id value!';
            res.status(422);
            res.send(error);
            return;
        }

        if (!Number.isInteger(levelInt)){
            console.log('[saveCommand] Bad level value for user ' + req.user.target_user_id + ': ' + req.body.level);
            error.error = 'Incorrect level value!';
            res.status(422);
            res.send(error);
            return;
        }

        if (!Number.isInteger(cooldownInt) || cooldownInt < 5){
            console.log('[saveCommand] Bad cooldown value for user ' + req.user.target_user_id + ': ' + req.body.cooldown);
            error.error = 'Incorrect cooldown value, expecting number bigger than 5';
            res.status(422);
            res.send(error);
            return;
        }

        if (!Number.isInteger(periodInt) || periodInt < 0){
            console.log('[saveCommand] Bad repeat_amount value for user ' + req.user.target_user_id + ': ' + req.body.repeat_amount);
            error.error = 'Incorrect repeat period value, bigger than 0';
            res.status(422);
            res.send(error);
            return;
        }
        
        if (req.body.reply_message == null || req.body.reply_message.trim() === ''){
            console.log('[saveCommand] Bad reply_message value for user ' + req.user.target_user_id + ': ' + req.body.reply_message);
            error.error = 'Reply message can not be empty!';
            res.status(422);
            res.send(error);
            return;
        }

        if (req.body.additional_text == null){
            console.log('[saveCommand] Bad additional_text value for user ' + req.user.target_user_id + ': ' + req.body.additional_text);
            error.error = 'Missing additional text!';
            res.status(422);
            res.send(error);
            return;
        }

        
        if (req.body.name == null || req.body.name.trim() === ''){
            console.log('[saveCommand] Bad name value for user ' + req.user.target_user_id + ': ' + req.body.name);
            error.error = 'Command name cannot be empty!';
            res.status(422);
            res.send(error);
            return;
        }

        db.sequelize.query('CALL saveCommandByUserId(:userId, :commandId, :commandName, :commandAction, :commandLevel, :commandActive, :commandCooldown, :commandRepeater, :commandMessage, :commandAdditional, @sta);', 
         {  replacements: {
                userId: req.user.target_user_id,
                commandId: req.body.channel_command_id || 0,
                commandName: req.body.name,
                commandAction: req.body.action,
                commandLevel: req.body.level,
                commandActive: req.body.active,
                commandCooldown: req.body.cooldown,
                commandRepeater: req.body.repeat_amount,
                commandMessage: req.body.reply_message,
                commandAdditional: req.body.additional_text
            },
        }).then(function(result){
            botHelper.syncUpdateCommand(null, req.user.target_user_id).then(function(response){
                //console.log(response)
            }).catch(function(err){
                console.log(err.statusCode + ' in bot sync saveCommand')
            });
            
            ChannelCommandController.getCommands(req, res);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
};

module.exports = ChannelCommandController;