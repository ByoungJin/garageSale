// Controller
var apkInfoController = require('../controllers/apkInfoController');

var router = require('express').Router();

// Create
router.post('/create', apkInfoController.apkInfoCreate);

// Read All
router.get('/read/all', apkInfoController.apkInfoRead);

// Redirection Install Url
router.get('/install', apkInfoController.apkInstall)

module.exports = router;