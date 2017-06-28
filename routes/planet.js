
// Controller
var userController = require('../controllers/user');
var planetController = require('../controllers/planet');

var router = require('express').Router();

router.post('/create', userController.ensureAuthenticated, planetController.planetCreate);

module.exports = router;