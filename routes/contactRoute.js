
var contactController = require('../controllers/contactController'); // Controllers

var router = require('express').Router();

router.post('/mail', contactController.contactPost);

module.exports = router;