
// Controller
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');

var router = require('express').Router();



// Create
router.post('/create', userController.ensureAuthenticated, productController.productCreate);

// Read

// Update (없으면 추가함)
router.post('/update', userController.ensureAuthenticated, productController.productUpdate);

// Delete
router.post('/delete', userController.ensureAuthenticated, productController.productDelete);


module.exports = router;