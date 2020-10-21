const db = require('../../models')
const path = require('path')

module.exports = function(router) {
    router.get('/company/:id', function(req, res) {
        db.Company.findOne({
            where: {id: req.params.id}
        }).then(function(dbCompany) {
            res.json(dbCompany)
        })
    });

    router.get('/company/new', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/new-company.html'))
    });
}