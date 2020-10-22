const db = require('../../models')
const bcrypt = require('bcrypt')
const session = require('express-session')


module.exports = function(router) {
    // route to log in manager
    router.post('/manager/login', function(req, res) {
        // look for a manager
        db.Manager.findOne({
            where: {email: req.body.email}
        }).then(function(dbManager) {
            // if no manager exists with same email, destroy session and 401
            if (!dbManager){
                res.session.destroy();
                return res.status(401).send('Incorrect email or password')
            } else if (bcrypt.compareSync(req.body.password, dbManager.password)) {
                console.log('passwords match')
                req.session.manager = {
                    email: dbManager.email,
                    id: dbManager.id
                }
                res.status(200).json(req.session)
            } else {
                req.session.destroy();
                return res.status(401).send("Incorrect email or password")
            }
        });
    });

    // route to log in manager
    router.post('/user/login', function(req, res) {
        // look for a manager
        db.User.findOne({
            where: {email: req.body.email}
        }).then(function(dbUser) {
            // if no manager exists with same email, destroy session and 401
            if (!dbUser){
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

    router.get('/sessiondata', function(req, res) {
        res.json(req.session)
    });

    // route to destroy session on logout
    router.post('/logout', function(req, res) {
        req.session.destroy();
    });
}