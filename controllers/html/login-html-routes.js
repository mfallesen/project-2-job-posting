const db = require('../../models')

module.exports = function(router) {
    router.get('/', function(req, res) {
        // get list of all companies in table to provide manager a list of companies to choose from
        db.Company.findAll({
            attributes: [
                'id',
                'company_name'
            ]
        }).then(function (companiesArr) {
            // render index page with info of manager and array of all company names and id's
            res.render('index', {companies: companiesArr})
        });
    });
}