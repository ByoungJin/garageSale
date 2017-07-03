
// Controller
var userController = require('../controllers/user');
var planetController = require('../controllers/planet');

var router = require('express').Router();

// Update (없으면 추가함)
router.post('/update', userController.ensureAuthenticated, planetController.planetUpdate);

// Delete

module.exports = router;