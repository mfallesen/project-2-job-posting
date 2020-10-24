const db = require('../../models')
const bcrypt = require('bcrypt')
const session = require('express-session')


module.exports = function (router) {
    // route to create a new manager account
    router.post('/manager/create', function (req, res) {
        // grab and store values from req.body
        const { first_name, last_name, email, password, phone, company_id } = req.body

        // check if db alread has a manager with the same email
        db.Manager.findOne({
            where: { email: email }
        }).then(function (dbManager) {
            // if there is already a manager with the same email, send status 401
            if (dbManager) {
                return res.status(401).end()
            }

            // if no manager is found, create a new manager in the db with the req values
            db.Manager.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone,
                company_id: company_id
            }).then(function (newManager) {
                // create a new session with manager's info
                req.session.manager = {
                    email: email,
                    id: newManager.id
                }
                // return 200 status code
                res.status(200).json(newManager)
            })
        })
    });

    // route to log in manager
    router.post('/manager/login', function (req, res) {
        // look for a manager
        db.Manager.findOne({
            where: { email: req.body.email }
        }).then(function (dbManager) {
            if (!dbManager) {
                // if no manager exists with same email, destroy session and 401
                req.session.destroy();
                return res.status(401).send('Incorrect email or password')
            } else if (bcrypt.compareSync(req.body.password, dbManager.password)) {
                // if passwords match, create session with manager info
                req.session.manager = {
                    email: dbManager.email,
                    id: dbManager.id
                }
                // send back 200 status
                res.status(200).json(req.session)
            } else {
                // if anything else isn't a valid login, destroy sessions and 401 status
                req.session.destroy();
                return res.status(401).send("Incorrect email or password")
            }
        });
    });

    // route to log in user
    router.post('/user/login', function (req, res) {
        // look for a manager
        db.User.findOne({
            where: { email: req.body.email }
        }).then(function (dbUser) {
            // if no manager exists with same email, destroy session and 401
            if (!dbUser) {
                req.session.destroy();
                return res.status(401).send('Incorrect email or password')
            } else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                req.session.user = {
                    email: dbUser.email,
                    id: dbUser.id
                }
                res.status(200).json(req.session)
            } else {
                req.session.destroy();
                return res.status(401).send("Incorrect email or password")
            }
        });
    });

    // dev route for viewing session data
    router.get('/sessiondata', function (req, res) {
        res.json(req.session)
    });

    // route to destroy session on logout
    router.get('/logout', function (req, res) {
        req.session.destroy();
        // redirect user to landing page on logout
        res.redirect('/')
    });
}