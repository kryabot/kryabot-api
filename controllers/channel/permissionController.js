const Auth = require('../../models').auth;
const errorHandler = require('../../util/catch');

const validTypeList = ['WEB', 'BOT', 'TGAUTH', 'SPOTIFY', 'DA'];

var PermissionController = {
    getActivePermissions: function (req, res){
        Auth.findAll({
            where: { user_id: req.user.target_user_id },
            attributes: ['type', 'scope', 'expires_at'],
            raw: true })
        .then(function(result){
            if(result) {
                const now = new Date();
                result.forEach(record => {
                    record['active'] = now <= record.expires_at;
                })
            }
            res.send(result);
        }).catch(function(err){
            errorHandler(err, req, res)
        });
    },
    deletePermission: function(req, res){
        const tokenType = req.params.tokenType;
        let error = {};

        if (req.user.target_user_id !== req.user.id) {
            console.log("Permission " + tokenType + " deletion not allowed: " +req.user.target_user_id + " "+req.user.id);
            error.error = 'Deletion not allowed!'
            res.status(422);
            res.send(error);
            return;
        }

        if(tokenType && validTypeList.includes(tokenType)) {
            Auth.destroy({
                where: {
                    user_id: req.user.target_user_id,
                    type: tokenType,
                }
            }).then(function(result){
                if(result && result === 1) {
                    res.send();
                } else {
                    error.error = "Nothing to delete"
                    res.status(422);
                    res.send(error);
                }
            }).catch(function(err){
                errorHandler(err, req, res)
            });
        } else {
            res.status(404);
            res.send();
        }
    },
};

module.exports = PermissionController;
