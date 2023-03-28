const Translation = require('../../models').translation;

var TranslationController = {
    getTranslations: function (req, res){
        Translation.findAll({ raw: true })
        .then(function(result){
            res.send(result);
        })
    },
    getLangTranslations: function (req, res){
        let inputLang = req.params.lang;
        Translation.findAll({ where: { lang: inputLang }, attributes: ['lang', 'keyword', 'value'], raw: true })
        .then(function(result){
            let body = '';
            result.forEach(translation => {
                body += `${translation.keyword} = ${translation.value} </br>`
            });

            res.send(body);
        })
    },
};

module.exports = TranslationController;