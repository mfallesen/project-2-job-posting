const db = require('../../models')

module.exports = function(router) {
    // route for updating manager info
    router.put('/api/manager/update', function(req, res) {
        const { first_name, last_name, email, phone, bio } = req.body

        const managerId = req.session.manager.id

        // update manager in db
        db.Manager.update({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            bio: bio
        }, {
            where: { id: managerId}
        }).then(function(updatedManager) {
            res.status(200).end();
        }).catch(err => {
            return res.status(500).end();
        })
    });
}