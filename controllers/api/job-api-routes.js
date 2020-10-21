const db = require('../../models')

module.exports = function(router) {
    router.post('/api/jobs/create', function(req, res) {
        const {title, description, type, wage, manager_id} = req.body
        console.log(req.body)

        db.Job.create({
            title: title,
            description: description,
            type: type,
            wage: wage,
            // not entierly sure why this is using camelcase
            ManagerId: manager_id
        }).then(function(newJob) {
            res.json(newJob)
        })
    });
}