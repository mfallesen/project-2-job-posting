const db = require('../../models')

module.exports = function(router) {
    // route to create a new user
    router.post('/api/account/user/new', function(req, res) {
        // grab and store values from req.body
        const {first_name, last_name, email, password, phone} = req.body

        // grab
        db.User.findOne({
            where: {email: email}
        }).then(function(dbUser) {
            // if a user is found who is already using the given email, return 500 status
            if (dbUser) {
                return res.status(500).end()
            }

            // if no user could be found, create a new user with the given values
            db.User.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone,
            }).then(function(newUser) {
                // send 200 status
                res.status(200).end();
            })
        })
    });
}