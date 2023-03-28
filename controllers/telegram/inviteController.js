const db = require('../../models');
const Twitch = require('../../util/twitch');
const errorHandler = require('../../util/catch');
const channel = require('../../models').channel;
const channelSubchat = require('../../models').channel_subchat;
const userModel = require('../../models').user;
const rightModel = require('../../models').tg_special_right;
const inviteModel = require('../../models').tg_invite;

const authController = require('../auth/authController');

var twitchHelper = new Twitch();

async function generateRandomString(length = 6){
    let generatedCode = Math.random().toString(36).substring(2, length) + Math.random().toString(36).substring(2, length);
    let requestRecords = await db.sequelize.query('CALL getActiveRequestByCode(:inputCode);', 
        {   replacements: {
            inputCode: generatedCode,
        },
    });

    if(requestRecords && requestRecords.length > 0){
        return await generateRandomString(length);
    } else {
        return generatedCode;
    }
}

async function getSubscribeData(token, channelUserId, targetTwitchId){
    let userRecord = await userModel.findOne({
        where: { user_id: channelUserId},
        raw: true
    });

    if(!userRecord){
        console.log('user record not found for ' + channelUserId);
        return null;
    }
    twitchHelper.setConfigTelegram();
    return await twitchHelper.getSubcriberDataByUser(token, userRecord.tw_id, targetTwitchId);
}

async function getUserRecordByTwitchId(twitchUserId){
    let userRecord = await userModel.findOne({
        where: { tw_id: twitchUserId},
        raw: true
    });

    if(!userRecord){
        console.log('user record not found for ' + twitchUserId);
        return null;
    }

    return userRecord
}

async function getSpecialRights(channelId, targetUserId){
    return await rightModel.findAll({
        where: {
            channel_id: channelId,
            user_id: targetUserId,
            deleted: 0
        },
        raw: true
    })
}

async function getTgInvitations(channelId, userId){
    return await inviteModel.findAll({
        where: {
            channel_id: channelId,
            user_id: userId,
            used_at: null
        },
        raw: true
    })
}

async function finalizeGroupCheck(req, res, channelRecord, channelSubchatRecord, tokenResp, validateResp, futureResponse){
    if(!channelSubchatRecord){
        futureResponse.error = 'translate_no_subchat';
        console.log('translate_no_subchat');
        res.send(futureResponse);
        return;
    }

    let userRecord = await getUserRecordByTwitchId(validateResp.user_id);
    if (userRecord == null){
        futureResponse.error = 'translate_no_db_user';
        console.log('translate_no_db_user');
        res.send(futureResponse);
        return;
    }

    let skipChecks = false;
    let rights = await getSpecialRights(channelRecord.channel_id, userRecord.user_id);
    let isVip = false;
    let isBanned = false;
    console.log('Special rights in channel ' + channelRecord.channel_name + ' for user ' + validateResp.user_id);
    
    if(rights != null){
        rights.forEach(right => {
            if (right.right_type === 'WHITELIST') {
                isVip = true;
            }
                
            if (right.right_type === 'BLACKLIST') {
                isBanned = true;
            }
        })
    }

    console.log('Banned: ' + isBanned + ', VIP: ' + isVip);
    if(isBanned){
        futureResponse.error = 'translate_user_banned';
        res.send(futureResponse);
        return;
    }

    let invitations = await getTgInvitations(channelRecord.channel_id, userRecord.user_id);
    let hasInvitation = false;
    if (invitations && invitations.length > 0) {
        hasInvitation = true
    }

    if (isVip || hasInvitation)
        skipChecks = true;

    console.log('in finalizeGroupCheck2, skip checks:' + skipChecks);
    if (!skipChecks && channelSubchatRecord.enabled_join == 0) {
        futureResponse.error = 'translate_join_disabled';
        //res.status(404);
        res.send(futureResponse);
        return;
    }

    if(!skipChecks && channelSubchatRecord.join_sub_only == 1){
        let subInfo = await getSubscribeData(tokenResp.access_token, channelRecord.user_id, validateResp.user_id);
        if(!subInfo || !subInfo.data[0].tier){
            /* Not subscriber */
            futureResponse.error = 'translate_not_subscriber';
            console.log('translate_not_subscriber');
            //res.status(404);
            res.send(futureResponse);
            return;
        }
        console.log('sub ok')
    }

    let existingRequestRecord = await db.sequelize.query('CALL getRequestsByTwitchId(:twitchId);', 
        {   replacements: {
            twitchId: validateResp.user_id
        },
    });

    let newCode = null;
    if(existingRequestRecord == null || existingRequestRecord.length === 0){
        newCode = await generateRandomString(6);
        saveNewRequestCode(validateResp.user_id, newCode);
    } else {
        newCode = existingRequestRecord[0].code;
    }

    let hashData = 'code=' + newCode + '&id=' + channelRecord.channel_id;
    console.log('hash data: ' + hashData);
    futureResponse.invite = encodeData(hashData).trimRight('=');
    res.send(futureResponse);
}

var saveNewRequestCode = async function(twitchId, newCode){
    db.sequelize.query('CALL saveRequest(:twitchId, :inputCode);', 
        {   replacements: {
            twitchId: twitchId,
            inputCode: newCode,
        },
        }).then(function(saveCodeResult){

        }).catch(function(err){
            errorHandler(err, req, res)
        });
};

var encodeData = function(data){
    let buff = new Buffer(data);  
    return buff.toString('base64').trim('=');
};

var TelegramInviteController = {
    verifyLogin: function(req, res){
        /* Verify inputs */
        let channelName = req.query.channel;
        let code = req.query.code;
        let futureResponse = {};
        if(!channelName || !code || !channelName.trim() || !code.trim()){
            res.status(422);
            res.send();
            return;
        }
        console.log('verifyLogin for telegram, code: ' + code);
        authController.loginTelegram(code).then(function(loginData){
            console.log(loginData);
            if(loginData.validateData == null || !loginData.success){
                /* Bad code, error from twitch */
                res.status(404);
                res.send(loginData.tokenData || loginData.validateData);
                return;
            }
            futureResponse.login = loginData.validateData.login;
            futureResponse.scope = loginData.validateData.scopes;

            channel.findOne({
                where: { channel_name: channelName },
                raw: true
            })
            .then(function(channelRecord){
                /* Bad channel name provided */
                if(!channelRecord){
                    futureResponse.error = 'translate_invalid_channel';
                    res.send(futureResponse);
                    return;
                }
                channelSubchat.findOne({
                    where: { channel_id: channelRecord.channel_id },
                    raw: true
                }).then(function(channelSubchatRecord){
                    finalizeGroupCheck(req, res, channelRecord, channelSubchatRecord, loginData.tokenData, loginData.validateData, futureResponse).then(function(){
                        console.log('finalizeGroupCheck completed')
                    })
                    
                }).catch(function(err){
                    console.log('error1');
                    console.log(err);
                    errorHandler(err, req, res)
                });
            }).catch(function(err){
                console.log('error2');
                console.log(err);
                errorHandler(err, req, res)
            });
        }).catch(function(err){
            console.log('error3');
            console.log(err);
            if (err && err.error){
                res.status(200);
                res.send(err.error || "");
            } else {
                errorHandler(err, req, res)
            }
        });
    },
};

module.exports = TelegramInviteController;
