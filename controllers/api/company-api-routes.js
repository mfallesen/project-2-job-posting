const db = require('../../models')

module.exports = function (router) {
    // route to create a new company
    router.post('/api/company/new', function(req, res) {
        // check if db already has a company with the same name
        db.Company.findOne({
            where: {company_name: req.body.company_name}
        }).then(function(dbCompany) {
            // if company with same name is already found, send 500 status
            if (dbCompany) {
                return res.status(500).end()
            }
            // if no company with same name is found, create new company in db and send back status 200
            db.Company.create(req.body).then(function(newCompany) {
                res.status(200).end()
            })
        })
    });
}