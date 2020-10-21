const db = require('../../models')

module.exports = function(router) {
    router.post('/api/account/manager/new', function(req, res) {
        const {first_name, last_name, email, password, phone, company_id} = req.body

        db.Managers.findOne({
            where: {email = email}
        }).then(function(dbManager) {
            if (dbManager) {
                return res.status(500).end()
            }

            db.Managers.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone,
                company_id: company_id
            }).then(function(newManager) {
                res.json(newManager)
            })
        })
    });

    router.post('/api/account/user/new', function(req, res) {
        const {first_name, last_name, email, password, phone} = req.body

        db.Users.findOne({
            where: {email = email}
        }).then(function(dbUser) {
            if (dbUser) {
                return res.status(500).end()
            }

            db.Users.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone,
            }).then(function(newUser) {
                res.json(newUser)
            })
        })
    });

    router.post('/api/jobs/create', function(req, res) {
        const {title, description, type, wage, manager_id, category} = req.body

        db.Jobs.create({
            title: title,
            description: description,
            type: type,
            wage: wage,
            manager_id: manager_id
        })
    });

    router.post('/api/company/new', function(req, res) {
        
    });
}