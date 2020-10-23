const db = require('../../models')
const path = require('path')

module.exports = function (router) {
    // route to render page to create a new manager
    router.get('/manager/new', function (req, res) {

        // get list of all companies in table to provide manager a list of companies to choose from
        db.Company.findAll({
            attributes: [
                'id',
                'company_name'
            ]
        }).then(function (companiesArr) {
            // temp json for front-end team
            res.json(companiesArr)

            // render manager page with info of manager and array of all company names and id's
            res.render('new-manager', {
                companies: companiesArr
            })
        })
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
            manager.first_name = managerInfo.first_name
            manager.last_name = managerInfo.last_name
            manager.email = managerInfo.email
            manager.phone = managerInfo.phone

            // object to hold info of company manager works for
            const company = dbManager.Company.dataValues

            // temp json for front-end team
            res.json({ manager: manager, company: company })

            // render handlebars file with company and manager objects
            // res.render('manager', {
            //     manager: manager,
            //     company: company
            // })
        }).catch(err => {
            // return status code 500 if other errors occur
            res.status(500).end();
        })
    });

    // route to render page for updating manager profile
    router.get('/manager/update/:id', function (req, res) {
        // check if manager is currently logged in, allowing him access to his profile page
        if (!req.session.manager || req.session.manager.id != req.params.id) {
            // return redirect to landing page to stop running code
            return res.redirect('/')
        }
        db.Manager.findOne({
            where: { id: req.params.id }
        }).then(function (dbManager) {
            // if no manager can be found, status code 404
            if (!dbManager) {
                return res.status(404).send('No manager found').end();
            }

            // store values from queried manager
            const { id, first_name, last_name, email, phone } = dbManager
            // create new manager obj with queried data
            const manager = { id, first_name, last_name, email, phone }

            // send json of manager obj for front-end team until page has been created
            res.json(manager)
        }).catch(err => {
            // return status code 500 if other errors occur
            res.status(500).end();
        })
    });
}