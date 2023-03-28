const db = require('../../models');
const errorHandler = require('../../util/catch');

var GlobalEventController = {
    getEventTopEaster: function (req, res){
        db.sequelize.query('CALL getGlobalEventTopData(:eventKey);', 
        {  replacements: {
                eventKey: 'easter'
           },
       }).then(function(result){
            let i = 0;
            let body = "2020 Easter event top users</br></br>";
            console.log('Successfully received data from getGlobalEventTopData');
            result.forEach(row => {
                i++;
                
                let name = row.dname;
                if(name == null || name === ""){
                    name = row.name
                }

                let rate = (Math.round((row.amount / parseInt(row.val) * 100) * 100) / 100).toFixed(2);
                body += `${i}. ${name} - ${row.amount} of ${row.val} (${rate}%)</br>`
            });

            res.send(body);
       }).catch(function(err){
        errorHandler(err, req, res);
    });
    },
    redirectDisabled: function (req, res){
        res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    },
    getEventTopHalloween: function (req, res){
        db.sequelize.query('SELECT u.name, u.dname, uc.amount FROM user_currency uc LEFT JOIN currency_type ct ON uc.currency_type_id = ct.currency_type_id LEFT JOIN user u ON u.user_id = uc.user_id WHERE ct.currency_key = "pumpkin" ORDER BY uc.amount DESC LIMIT 100;',
            ).then(function(result){
                result[0].forEach(row => {
                    row.amount = parseInt(row.amount);
                });

                res.send(result[0]);
        }).catch(function(err){
            errorHandler(err, req, res);
        });
    },
};

module.exports = GlobalEventController;
