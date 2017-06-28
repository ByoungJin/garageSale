
var contactController = require('../controllers/contact'); // Controllers

var router = require('express').Router();

router.post('/mail', contactController.contactPost);

module.exports = router;