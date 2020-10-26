const db = require('../../models')
const path = require('path')

module.exports = function (router) {

    // route for view manager's created job postings
    router.get('/manager/jobs', function (req, res) {
        console.log('\n***getting manager jobs***\n')
        // check if manager is currently logged in, allowing him access to his profile page
        if (!req.session.manager) {
            // return redirect to landing page to stop running code
            // return res.redirect('/')
        }
        // grab all jobs for that manager from db
        db.Job.findAll({
            where: { manager_id: req.session.manager.id }
        }).then(function (dbJobs) {
            const jobs = []

            dbJobs.forEach(job => {
                // change ft/pt from db to full time/part time
                if (job.dataValues.type === 'ft') {
                    job.dataValues.type = 'Full Time'
                } else {
                    job.dataValues.type = 'Part Time'
                }
                jobs.push(job.dataValues)
            })
            res.render('managerjobs', { jobs: jobs })
        })
    });

    // route to redirect to manager's profile page from job listings page
    router.get('/profile', function (req, res) {
        console.log('\nget profile\n')
        // check if manager is currently logged in
        if (req.session.manager) {
            // grab manager's id from session and redirect to their profile page
            const manager_id = req.session.manager.id
            res.redirect('/manager/' + manager_id)
            // check if any user is currently logged in
        } else if (req.session.user) {
            // grab user's id from session and redirect to their profile page
            const user_id = req.session.user.id
            res.redirect('/user/' + user_id)
        } else {
            // if nobody is logged in, redirect to home page
            res.redirect('/')
        }
    });

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
}