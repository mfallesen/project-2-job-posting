const db = require('../../models')

module.exports = function(router) {
    router.post('/api/account/user/new', function(req, res) {
        console.log("Making request")
        console.log(req.body)
        const {first_name, last_name, email, password, phone} = req.body

        db.User.findAll({
            where: {email: email}
        }).then(function(dbUser) {
            // if a user is found who is already using the given email, return 500 status
            if (dbUser.length > 0) {
                return res.status(500).end()
            }
            console.log(dbUser)

            db.User.create({
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
}