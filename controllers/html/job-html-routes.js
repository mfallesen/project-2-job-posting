const db = require('../../models')

// function that take array of jobs from db and modifies objects in array to more readable json
function modifyJobArray(dbJobs) {
    // empty object to hold list of all jobs in more readable json format
    const jobs = []
    // iterate through each job
    dbJobs.forEach(job => {
        // grab each property name from job object
        const { id, title, description, type, wage, createdAt, updatedAt, Manager: manager } = job
        // store company obj in variable
        const company = job.Manager.Company
        // object to hold info specific to that job
        const jobInfo = {
            id: id,
            title: title,
            description: description,
            wage: wage,
            created_at: createdAt,
            updated_at: updatedAt
        }
        // add full words for job type
        if (job.type === 'ft') {
            jobInfo.type = 'Full Time'
        } else {
            jobInfo.type = 'Part Time'
        }
        // add manager object to job obj
        jobInfo.manager = {
            id: manager.id,
            first_name: manager.first_name,
            last_name: manager.last_name,
            email: manager.email,
            phone: manager.phone,
        }
        // add company object to job obj
        jobInfo.company = {
            id: company.id,
            company_name: company.company_name,
            phone: company.phone
        }
        // push modified job object to jobs array
        jobs.push(jobInfo)
    })

    // return array of jobs
    return jobs
}


module.exports = function (router) {

    // route to render page to create a new job posting
    router.get('/job/create', function (req, res) {
        // grab all benefits from db
        db.Benefit.findAll({}).then(function (dbBenefits) {
            const benefits = []
            // modify benefits from db into a more readable format for front-end
            dbBenefits.forEach(benefit => {
                // put relevant data from benefit into obj
                const benefitData = {
                    id: benefit.dataValues.id,
                    text: benefit.dataValues.benefit_text
                }
                // push obj to array of benefits
                benefits.push(benefitData)
            })
            // get the manager's details from the session
            const manager = req.session.manager
            // render the page
            res.render('jobpost', {
                manager: manager,
                benefits: benefits
            })
        })
    });

    // route to return job listings with optional filter
    router.get('/job/listings/:filter?', function (req, res) {
        // define empty variables for assigning filters
        let searchCondition;
        let searchSort;

        // assign variables above based on filter parameter passed
        switch (req.params.filter) {
            // if param is date create array for sorting by date created
            case "date":
                searchSort = ['createdAt', 'DESC']
                break;
            // if param is full-time, create obj to search for only fulltime jobs
            case 'full-time':
                searchCondition = { type: 'ft' };
                break;
            // if param is part-time, create obj to search for only part time jobs
            case 'part-time':
                searchCondition = { type: 'pt' };
                break;
            // if param is wage, create array for sorting by wage
            case 'wage':
                searchSort = ['wage', 'DESC'];
                break;
        }

        // check if manager is logged in for displaying login/profile button
        if (req.session.manager) {
            console.log('hi')
            console.log(req.session.manager.id)
            var manager = {
                isLoggedIn: true,
                id: req.session.manager.id
            }
        } else {
            console.log('not logged in')
            var manager = {
                isLoggedIn: false
            }
        }

        // if user wants wants to sort jobs based on date or wage, query all jobs and plug in sort array from above
        if (req.params.filter === 'date' || req.params.filter === 'wage') {
            db.Job.findAll({
                include: {
                    model: db.Manager,
                    include: db.Company
                },
                order: [
                    searchSort
                ]
            }).then(function (dbJobs) {
                // if no jobs are found, send status code 404
                if (dbJobs.length === 0) {
                    return res.status(404).send("No jobs found").end();
                }

                // modify jobs array to be more readable
                const jobs = modifyJobArray(dbJobs)

                // render jobs handlebars with jobs array
                res.render('jobindex', {
                    jobs: jobs,
                    manager: manager
                })
            }).catch(function (err) {
                // if any other error occurs, send status code 500
                return res.status(422).end();
            })

            // if user wants to only get full/part time jobs, query all jobs and plug in condition for searching
        } else if (req.params.filter === 'full-time' || req.params.filter === 'part-time') {
            db.Job.findAll({
                include: {
                    model: db.Manager,
                    include: db.Company
                },
                where: searchCondition
            }).then(function (dbJobs) {
                // if no jobs are found, send status code 404
                if (dbJobs.length === 0) {
                    return res.status(404).send("No jobs found").end();
                }

                // modify jobs array to be more readable
                const jobs = modifyJobArray(dbJobs)

                // render jobs handlebars with jobs array
                res.render('jobindex', {
                    jobs: jobs,
                    manager: manager
                })
            }).catch(function (err) {
                // if any other error occurs, send status code 500
                return res.status(422).end();
            })

            // if nothing is entered or random text is entered, query for all jobs to be displayed on page
        } else {
            db.Job.findAll({
                include: {
                    model: db.Manager,
                    include: db.Company
                }
            }).then(function (dbJobs) {
                // if no jobs are found, send status code 404
                if (dbJobs.length === 0) {
                    return res.status(404).send("No jobs found").end();
                }

                // modify jobs array to be more readable
                const jobs = modifyJobArray(dbJobs)

                // render jobs handlebars with jobs array
                res.render('jobindex', {
                    jobs: jobs,
                    manager: manager
                })
            }).catch(function (err) {
                // if any other error occurs, send status code 500
                return res.status(422).end();
            })
        }
    });

    // route to render page for updating an existing job posting
    router.get('/job/update/:id', function (req, res) {
        // grab job from database with id in url
        db.Job.findOne({
            where: { id: req.params.id },
            include: {
                model: db.Manager,
                include: db.Company
            }
        }).then(function (dbJob) {
            // only allow access if the manager who posted the job is also logged in
            if (!req.session.manager || req.session.manager.id != dbJob.manager_id) {
                // return redirect to landing page to stop running code
                return res.redirect('/')
            }

            // if id does not exist in jobs table, return status code 404
            if (!dbJob) {
                return res.status(404).send('Job not found')
            }

            // store values from found job
            const { id, title, description, type, wage } = dbJob

            // create object to be used for rendering with values from job in db
            const job = { id, title, description, type, wage }
            // if the job is full time
            if (job.type === 'ft') {
                // set isFullTime to true
                job.isFullTime = true
            } else {
                // else set to false
                job.isFullTime = false
            }
            console.log(job)

            const manager = dbJob.Manager.dataValues
            const company = manager.Company.dataValues

            // send json of job for front-end until page is created
            // res.json({
            //     job: job,
            //     manager: manager,
            //     company: company
            // })

            // TODO: change render to match file name when file is created
            res.render('jobpostedit', {
                job: job,
                manager: manager,
                company: company
            })
        }).catch(err => {
            // for any other errors send status code 422
            res.status(422).end();
        })
    });

    // route to display page for a specific job
    router.get('/job/:id', function (req, res) {
        // get job from db
        db.Job.findOne({
            where: { id: req.params.id },
            include: [
                db.Benefit,
                {
                    model: db.Manager,
                    include: db.Company
                }]
        }).then(function (dbJob) {
            // if no job is found, status 404
            if (!dbJob) {
                return res.status(404).send('No job found').end();
            }

            // grab values from db job
            const { id, title, description, type, wage, Manager: managerObj } = dbJob
            const { id: manager_id, first_name, last_name, email, phone, Company } = managerObj
            const { id: company_id, company_name, phone: company_phone } = Company

            // if job is found, separate job/manager/company info into separate objects
            const job = { id, title, description, wage }
            // write full words for job type
            if (dbJob.type === 'ft') {
                job.type = 'Full Time'
            } else {
                job.type = "Part Time"
            }
            const manager = {
                id: manager_id,
                first_name,
                last_name,
                email,
                phone,
            }
            const company = {
                id: company_id,
                company_name,
                phone: company_phone
            }
            // array to hold benefits for the job
            const benefits = []
            // clean up format of benefits array to be more readable
            dbJob.Benefits.forEach(benefit => {
                benefits.push(benefit.dataValues)
            })

            // render job page with job object
            res.render('jobdetails', {
                job: job,
                manager: manager,
                company: company,
                benefits: benefits
            })
        })
    });
}