const db = require('../../models')

module.exports = function (router) {
    // route to create a new company
    router.post('/api/company/new', function(req, res) {
        // check if db already has a company with the same name
        db.Company.findOne({
            where: {company_name: req.body.company_name}
        }).then(function(dbCompany) {
            // if company with same name is already found, send 500 status
            if (dbCompany) {
                return res.status(500).end()
            }
            // if no company with same name is found, create new company in db and send back status 200
            db.Company.create(req.body).then(function(newCompany) {
                res.status(200).json(newCompany.dataValues).end();
            })
        }).catch(err => {
            // if errors occur from issues parsing data sent from client, status code 422
            res.status(422).end();
        })
    });

    // route for updating company info
    router.put('/api/company/update/:id', function(req, res) {
        // store values from req.body
        const {company_name, phone} = req.body

        db.Company.update({
            company_name: company_name,
            phone: phone
        }, {
            where: {id: req.params.id}
        }).then(function(newCompany) {
            res.json(newCompany)
            // if response is 0, status 404 because id didn't match any companies
            if (newCompany[0] === 0) {
                return res.status(404).send('Could not find company to be updated').end();
            } else {
                res.status(200).end();
            }
        }).catch(err => {
            // catch errors from request url id param no being a number, status 422
            res.status(422).end();
        })
    });
}