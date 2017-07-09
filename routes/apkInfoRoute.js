// Controller
var apkInfoController = require('../controllers/apkInfo');

var router = require('express').Router();

// Create
router.post('/create', apkInfoController.apkInfoCreate);

// Read All
router.get('/read/all', apkInfoController.apkInfoRead);

module.exports = router;