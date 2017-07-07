
// Controller
var userController = require('../controllers/user');
var productController = require('../controllers/product');

var router = require('express').Router();



// Create
router.post('/create', userController.ensureAuthenticated, productController.productCreate);

// Read

// Update (없으면 추가함)
//router.post('/update', userController.ensureAuthenticated, productController.productUpdate);

// Delete


module.exports = router;