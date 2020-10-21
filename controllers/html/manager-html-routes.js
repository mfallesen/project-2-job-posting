const db = require('../../models')
const path = require('path')

module.exports = function (router) {
    // route to render page to create a new manager
    router.get('/account/manager/new', function (req, res) {

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
            // res.render('new-manager', {
            //     companies: companiesArr
            // })
        })
    });

    // route to render manager's profile page
    router.get('/account/manager/:id', function (req, res) {
        // find the manager record in the managers table along with company info for that manager
        db.Manager.findOne({
            where: { id: req.params.id },
            include: db.Company
        }).then(function (dbManager) {
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
            res.json({manager: manager, company: company})
            
            // render handlebars file with company and manager objects
            // res.render('manager', {
            //     manager: manager,
            //     company: company
            // })
        })
    });
}