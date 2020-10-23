const db = require('../../models')
const path = require('path')

module.exports = function(router) {
    // route to render info page for a company
    router.get('/company/:id', function(req, res) {
        // find company in db
        db.Company.findOne({
            where: {id: req.params.id}
        }).then(function(dbCompany) {
            // temp json for front-end team
            res.json(dbCompany)
        })
    });

    // route for page to create a new company (may just be a post route and not a separate page)
    router.get('/company/new', function (req, res) {
        res.render('newcompany')
    });
}