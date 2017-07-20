
// Controller
var userController = require('../controllers/userController');
var planetController = require('../controllers/planetController');

var router = require('express').Router();

// Update (없으면 추가함)
router.post('/update', userController.ensureAuthenticated, planetController.planetUpdate);

// Delete

module.exports = router;