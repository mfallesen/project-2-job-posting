const db = require('../../models')
console.log(db)
module.exports = function (router) {
    router.get('/jobs/listings', function (req, res) {
        // find jobs from database
        //search jobs, if filter then bring jobs back based on filer, if no filter then bring all jobs back from table

        db.Jobs.findAll({ where: req.query })
            .then(jobs => {
                res.json(jobs);
            })
            .catch(err => {
                res.status(422).json(err);
            });
    });

    router.post('/jobs/create', function (req, res) {
        console.log(req.body)
        // create jobs based on input from from end
        db.Jobs.create({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            wage: req.body.wage,
            manager_id: req.body.manager_id,
        })
            .then(() => res.send('Successfully created job.'))
            .catch(err => {
                res.status(422).json(err);
            });
    });
}