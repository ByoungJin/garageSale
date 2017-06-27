
// Controller
var userController = require('../controllers/user');
var planetController = require('../controllers/planet');

module.exports = function(app){
    app.post('/planet/create', userController.ensureAuthenticated, planetController.planetCreate);
};