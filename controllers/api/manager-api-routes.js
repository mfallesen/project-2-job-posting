const db = require('../../models')

module.exports = function(router) {
    router.post('/api/account/manager/new', function(req, res) {
        const {first_name, last_name, email, password, phone, company_id} = req.body

        db.Manager.findOne({
            where: {email: email}
        }).then(function(dbManager) {
            if (dbManager) {
                return res.status(500).end()
            }

            db.Manager.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone,
                // not sure why this FK is using camel case
                CompanyId: company_id
            }).then(function(newManager) {
                res.json(newManager)
            })
        })
    });
}