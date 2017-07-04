
// Controller
var userController = require('../controllers/user');
var productController = require('../controllers/product');
var multer  = require('multer')
var router = require('express').Router();



// Create
router.post('/create', userController.ensureAuthenticated, productController.productCreate);

// Read

// Update (없으면 추가함)
//router.post('/update', userController.ensureAuthenticated, productController.productUpdate);

// Delete


// Picture test
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage })

router.post('/picture',upload.single('file'),productController.pictureUpload);

module.exports = router;