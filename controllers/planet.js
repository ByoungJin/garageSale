
var User = require('../models/User');
var Planet = require('../models/Planet');

// Create
exports.planetCreate = function(req, res, next){
    req.assert('name', 'Name cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    var planet = new Planet();

    planet.name = req.body.name;
    planet.address = req.body.address;
    planet.latitude = req.body.latitude;
    planet.longitude = req.body.longitude;
    planet.description = req.body.description;
    planet.startDay = new Date(req.body.startDay);
    planet.endDay = new Date(req.body.endDay);

    req.user.planets.push(planet);

    req.user.save(function(err){
        res.send({planet : planet});
    });

};

// Read

// Update

// Delete

