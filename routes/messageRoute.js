// Controller
var messageController = require('../controllers/messageController');
var userController = require('../controllers/userController'); // Controller

var router = require('express').Router();

// Create
router.post('/create', userController.ensureAuthenticated, messageController.messageCreate);

// Read User List
router.get('/list', userController.ensureAuthenticated, messageController.userList);

// Read Message List With One User
router.get('/list/:id', userController.ensureAuthenticated, messageController.messageList);

// Delete
router.post('/delete', userController.ensureAuthenticated, messageController.messageDelete);

module.exports = router;