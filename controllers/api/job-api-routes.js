const db = require('../../models')

module.exports = function(router) {
    // route to create a new job posting
    router.post('/api/jobs/create', function(req, res) {
        // grab and store values from req.body
        const {title, description, type, wage, manager_id} = req.body

        // create new job in db
        db.Job.create({
            title: title,
            description: description,
            type: type,
            wage: wage,
            // not entierly sure why this is using camelcase
            manager_id: manager_id
        }).then(function(newJob) {
            res.json(newJob)
        })
    });
}