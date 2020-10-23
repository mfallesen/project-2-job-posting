const db = require('../../models')

module.exports = function(router) {
    router.get('/', function(req, res) {
        // get list of all companies in table to provide manager a list of companies to choose from
        db.Company.findAll({
            attributes: [
                'id',
                'company_name'
            ]
        }).then(function (companiesArr) {
            // object with array of jobs to be used for rendering page
            const data = {
                companies: []
            }
            
            // iterate through db array of companies
            companiesArr.forEach(company => {
                // create new object to to add to companies array
                const companyObj = {
                    id: company.dataValues.id,
                    company_name: company.dataValues.company_name
                }
                // append obj to companies arr
                data.companies.push(companyObj)
            })
            // render index page with info of manager and array of all company names and id's
            // res.json(companiesArr)
            res.render('index', data)
        });
    });
}