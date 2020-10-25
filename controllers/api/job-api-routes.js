const db = require('../../models')

module.exports = function(router) {
    // route to create a new job posting
    router.post('/api/job/create', function(req, res) {
        // grab and store values from req.body
        const { title, description, type, wage } = req.body

        // grab manager id and company from db
        const manager_id = req.session.manager.id

        // create new job in db
        db.Job.create({
            title: title,
            description: description,
            type: type,
            wage: wage,
            manager_id: manager_id
        }).then(function(newJob) {
           res.json(newJob.dataValues)
        })
    });

    // route to update an existing job
    router.put('/api/job/update/:id', function(req, res) {
        // store values from req.body
        const {title, description, type, wage} = req.body
        // run update query to job with given id
        db.Job.update({
            title: title,
            description: description,
            type: type,
            wage: wage
        }, {
            where: {id: req.params.id}
        }).then(function(dbJob) {
            if (dbJob[0] === 0) {
                // if response is 0, status 404 because it didn't match any jobs
                return res.status(404).send('Could not find company to be updated')
            } else {
                res.status(200).end();
            }
        }).catch(err => {
            // catch errors from client data not being parsable, status 422
            res.status(422).end();
        })
    });

    // route to delete an existing job
    router.delete('/api/job/:id', function(req, res) {
        // grab job id from url
        const jobId = req.params.id
        // delete job from db
        db.Job.destroy({
            where: {id: jobId}
        }).then(function() {
            res.status(200).end();
        })
    });
}