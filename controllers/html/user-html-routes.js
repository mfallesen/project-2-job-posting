const db = require('../../models')
const path = require('path')

module.exports = function(router) {
    router.get('/account/user/:id', function(req, res) {
        db.User.findOne({
            where: {id: req.params.id},
            include: [
                {
                    model: db.Job
                }
            ]
        }).then(function(dbUser) {
            // auto generated fields are also camel case here for some reason
            var {id, first_name, last_name, email, phone, createdAt, updatedAt} = dbUser
            
            const user = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                created_at: createdAt,
                updated_at: updatedAt
            }

            // empty array to hold list of jobs with only properties needed for generating page
            const jobsArr = []
            // iterate through each job found
            dbUser.Jobs.forEach(function(job) {
                // grab only relevant properties and put them in a new object
                const jobObj = {
                    id: job.id,
                    title: job.title,
                    description: job.description,
                    type: job.type,
                    wage: job.wage,
                    manager_id: job.ManagerId,
                    created_at: job.createdAt,
                    updated_at: job.updatedAt
                }
                // push new object to jobs array
                jobsArr.push(jobObj)
            })
            
            res.render('user-profile', {
                user: user,
                jobs: jobsArr
            })
        })
    });

    router.get('/account/user/new', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/new-user.html'))
    });
}