
var userController = require('../controllers/user'); // Controller
var multer  = require('multer');
var router = require('express').Router();


router.put('/account', userController.ensureAuthenticated, userController.accountPut);
router.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
router.post('/signup', userController.signupPost);
router.post('/login', userController.loginPost);
router.post('/login/google', userController.googleLoginPost);

router.post('/forgot', userController.forgotPost);
router.post('/reset/:token', userController.resetPost);
router.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
router.post('/auth/facebook', userController.authFacebook);
router.get('/auth/facebook/callback', userController.authFacebookCallback);
router.post('/auth/google', userController.authGoogle);
router.get('/auth/google/callback', userController.authGoogleCallback);
router.post('/auth/token', userController.ensureAuthenticated, userController.authToken);

router.use('/planet', require('./planetRoute'));
router.post('/list', userController.ensureAuthenticated, userController.getList);

// profile
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.post('/uploads/profile',upload.single('profile'),userController.ensureAuthenticated,userController.pictureUpload);

module.exports = router;