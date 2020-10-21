const db = require('../../models')

module.exports = function(router) {
    router.get('/login', function(req, res) {
        
    });

    router.get('/', function(req, res) {
        res.redirect('/jobs/listings')
    });
}