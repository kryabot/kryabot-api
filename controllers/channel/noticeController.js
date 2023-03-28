const db = require('../../models');
const KryaBot = require('../../util/kryabot');
const errorHandler = require('../../util/catch');

var botHelper = new KryaBot();

var NoticeController = {
    getNotices: function (req, res){
        /* Get notices */
        db.sequelize.query('CALL getChannelNoticesByUserId(:userId);', 
         {  replacements: {
                userId: req.user.target_user_id
            },
        }).then(function(result){
            res.send(result)
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    saveNotice: function(req, res){
        /* Validate body values before saving */
        if(req.body.channel_notice_id && !Number.isInteger(req.body.channel_notice_id)){
            console.log('[saveNotice] Bad channel_notice_id value for user ' + req.user.target_user_id + ': ' + req.body.channel_notice_id);
            res.status(422);
            res.send();
            return;
        }

        if (!Number.isInteger(req.body.notice_type_id)){
            console.log('[saveNotice] Bad notice_type_id value for user ' + req.user.target_user_id + ': ' + req.body.notice_type_id);
            res.status(422);
            res.send();
            return;
        }

        if (!Number.isInteger(req.body.count_from)){
            console.log('[saveNotice] Bad count_from value for user ' + req.user.target_user_id + ': ' + req.body.count_from);
            res.status(422);
            res.send();
            return;
        }

        if (!Number.isInteger(req.body.count_to)){
            console.log('[saveNotice] Bad count_to value for user ' + req.user.target_user_id + ': ' + req.body.count_to);
            res.status(422);
            res.send();
            return;
        }

        if (req.body.count_from > req.body.count_to){
            console.log('[saveNotice] Bad count_to and count_from values for user ' + req.user.target_user_id + ': ' + req.body.count_from + ' ' + req.body.count_to);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL saveChannelNoticeByUserId(:userId, :noticeId, :noticeTypeId, :countFrom, :countTo, :noticeReply, @sta);', 
         {  replacements: {
                userId: req.user.target_user_id,
                noticeId: req.body.channel_notice_id || 0,
                noticeTypeId: req.body.notice_type_id,
                countFrom: req.body.count_from,
                countTo: req.body.count_to,
                noticeReply: req.body.reply
            },
        }).then(function(result){
            botHelper.syncUpdateNotice(null, req.user.target_user_id).then(function(response){
                //console.log(response)
            }).catch(function(err){
                console.log(err.statusCode + ' in bot sync saveNotice')
            });
            NoticeController.getNotices(req, res)
            //res.send();
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deleteNotice: function(req, res){
        let deleteId = parseInt(req.params.id);

        if (!Number.isInteger(deleteId)){
            console.log('[deleteNotice] Bad id value for user ' + req.user.target_user_id + ': ' + deleteId);
            res.status(422);
            res.send();
            return;
        }

        db.sequelize.query('CALL deleteChannelNoticeByUserId(:userId, :noticeId, @sta);', 
        {  replacements: {
               userId: req.user.target_user_id,
               noticeId: deleteId,
           },
       }).then(function(result){
            botHelper.syncUpdateNotice(null, req.user.target_user_id).then(function(response){
                //console.log(response)
            }).catch(function(err){
                console.log(err.statusCode + ' in bot sync saveNotice')
            });

            res.send();
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    }
};

module.exports = NoticeController;