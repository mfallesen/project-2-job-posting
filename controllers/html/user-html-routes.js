const db = require('../../models')
const path = require('path')

module.exports = function(router) {
    // route to render user profile page
    router.get('/account/user/:id', function(req, res) {
        // find user in db
        db.User.findOne({
            where: {id: req.params.id},
            include: [
                {
                    model: db.Job
                }
            ]
        }).then(function(dbUser) {
            console.log(dbUser)
            // auto generated fields are also camel case here for some reason
            var {id, first_name, last_name, email, phone, createdAt, updatedAt} = dbUser
            
            // create user obj with info to be used for render
            const user = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                created_at: createdAt,
                updated_at: updatedAt
            }

            // empty array to hold list of jobs with only properties needed for rendering page
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

            // temp json to show obj and array that will be used for rendering file
            res.json({user: user, jobs: jobsArr})
            
            // render page with user obj and jobs array
            // res.render('user-profile', {
            //     user: user,
            //     jobs: jobsArr
            // })
        })
    });

    // route to display page for creating a new user
    router.get('/account/user/new', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/new-user.html'))
    });

    // route to display page for updating user profile info
    router.get('/account/user/update/:id', function(req, res) {
        db.User.findOne({
            where: {id: req.params.id}
        }).then(function(dbUser) {
            // no user is found, send status code 404
            if (!dbUser) {
                return res.status(404).send('No user found').end();
            }

            // store values of user from query
            const {id, first_name, last_name, email, phone} = dbUser;

            // create new object with relevant data from query
            const user = {id, first_name, last_name, email, phone}

            // change res.json to a render when page is created
            res.json(user)
        }).catch(err => {
            // if any other errors occur, status 500
            res.status(500).end();
        })
    });
}