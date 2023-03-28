const WebLog = require('../../models').web_log;

async function saveLog(req, res){
    let userId = 0;
    let targetId = 0;
    if(req.user){
        userId = req.user.id;
        targetId = req.user.target_user_id;
    }

    // We interested only in authorized requests
    if(userId === 0)
        return

    try{
        await WebLog.create({
            user_id: userId,
            target_user_id:  targetId,
            method: req.method,
            uri: req.baseUrl + req.path,
            result_code: res.statusCode,
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
        })
    } catch (e) {
        console.log("Failed to save request log: User: " + userId + " (" + targetId + ") for uri " + req.originalUrl);
        console.log(e);
    }
}

const accessController = {
    registerHandler: async function (req, res, next) {
        // res.on('finish', async function () {
        //     await saveLog(req, res);
        // });
        res.on('close', async function () {
            await saveLog(req, res);
        });
        next();
    }
};

module.exports = accessController;
