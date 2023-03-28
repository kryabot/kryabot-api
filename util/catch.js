const KryaBot = require('../util/kryabot');
var botHelper = new KryaBot();

module.exports = function(err, req, res){
    console.log(err);
    let report_id = 0;

    if (req.user && req.user.length > 0){
        report_id = req.user.target_user_id
    }

    /* SQL custom data errors written in stores procedures */
    if (err && err.parent && err.parent.sqlState == '45000'){
        botHelper.reportError(err.parent, report_id)
        .then(function(resp){
            if (resp.code == '1'){
                console.log('reported')
            } else {
                console.log(resp)
            }
        }).catch(function(err){
            console.log('failed to report error: ' + err)
        });
        console.log(err.parent.sqlMessage);
        res.status(422);
        res.send();
    } else {
        botHelper.reportError(err, report_id)
        .then(function(resp){
            console.log('reported');
            console.log(resp)
        }).catch(function(err){
            console.log('failed to report error: ' + err)
        });
        console.log(err);
        res.status(500);
        res.send();
    }
};