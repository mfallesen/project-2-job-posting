const db = require('../../models')

module.exports = function(router) {
    // route to create a new manager
    router.post('/api/account/manager/new', function(req, res) {
        // grab and store values from req.body
        const {first_name, last_name, email, password, phone, company_id} = req.body

        // check if db alread has a manager with the same email
        db.Manager.findOne({
            where: {email: email}
        }).then(function(dbManager) {
            // if there is a manager with the same email, send status 500
            if (dbManager) {
                return res.status(500).end()
            }

            // if no manager is found, create a new manager in the db with the req values
            db.Manager.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone,
                company_id: company_id
            }).then(function(newManager) {
                // send back 200 status
                res.status(200).end()
            })
        })
    });
}