
var contactController = require('../controllers/contact'); // Controllers

module.exports = function(app){
    app.post('/contact', contactController.contactPost);
};