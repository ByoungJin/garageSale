// Controller
var categoryController = require('../controllers/categoryController');
var userController = require('../controllers/userController'); // Controller

var router = require('express').Router();

// Create
router.post('/create', categoryController.categoryCreate);

// Read User List
router.get('/list', categoryController.categoryList);

// Delete
router.post('/delete', categoryController.categoryDelete);

module.exports = router;