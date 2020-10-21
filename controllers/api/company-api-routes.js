const db = require('../../models')

module.exports = function (router) {
    router.post('/api/company/new', function(req, res) {
        db.Company.findOne({
            where: {company_name: req.body.company_name}
        }).then(function(dbCompany) {
            // if company with same name is already found, send 500 status
            if (dbCompany) {
                return res.status(500).end()
            }
            // if no company with same name is found, create new company in db and send back json of new company
            db.Company.create(req.body).then(function(newCompany) {
                res.json(newCompany)
            })
        })
    });
}