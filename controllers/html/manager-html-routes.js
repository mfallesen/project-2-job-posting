const db = require('../../models')
const path = require('path')

module.exports = function (router) {
    // route to render manager's profile page
    router.get('/manager/:id', function (req, res) {
        // check if manager is currently logged in, allowing him access to his profile page
        if (!req.session.manager || req.session.manager.id != req.params.id) {
            // return redirect to landing page to stop running code
            return res.redirect('/')
        }
        // find the manager record in the managers table along with company info for that manager
        db.Manager.findOne({
            where: { id: req.params.id },
            include: db.Company
        }).then(function (dbManager) {
            // if no manager can be found, status code 404
            if (!dbManager) {
                return res.status(404).send('No manager found').end();
            }

            // grab datavalues from response
            const managerInfo = dbManager.dataValues

            // empty object to hold manager's info
            const manager = {}
            // add info from db query to manager obj
            manager.id = managerInfo.id
            manager.first_name = managerInfo.first_name
            manager.last_name = managerInfo.last_name
            manager.email = managerInfo.email
            manager.phone = managerInfo.phone
            manager.bio = managerInfo.bio

            // object to hold info of company manager works for
            const company = dbManager.Company.dataValues

            // render handlebars file with company and manager objects
            res.render('managerpage', {
                manager: manager,
                company: company
            })
        }).catch(err => {
            // return status code 422 if other errors occur
            res.status(422).end();
        })
    });

    // route for view manager's created job postings
    router.get('/manager/:id/jobs', function (req, res) {
        // check if manager is currently logged in, allowing him access to his profile page
        if (!req.session.manager || req.session.manager.id != req.params.id) {
            // return redirect to landing page to stop running code
            return res.redirect('/')
        }
        // grab all jobs for that manager from db
        db.Job.findAll({
            where: { manager_id: req.params.id }
        }).then(function (dbJobs) {
            const jobs = []

            dbJobs.forEach(job => {
                jobs.push(job.dataValues)
            })
            console.log(jobs)
            res.render('managerjobs', { jobs: jobs })
        })
    });
}
