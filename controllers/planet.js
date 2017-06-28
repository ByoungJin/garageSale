
var Planet = require('../models/Planet');

// Create
exports.planetCreate = function(req, res, next){
    req.assert('name', 'Name cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    if(req.user.planets.length > 0){
        return res.status(401).send({ msg: 'Planet already exist' });
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

exports.planetUpdate = function(req, res, next){

    if(req.user.planets.length == 0){
        exports.planetCreate(req, res, next);
    }

    var planet = req.user.planets[0];

    planet.name = req.body.name;
    planet.address = req.body.address;
    planet.latitude = req.body.latitude;
    planet.longitude = req.body.longitude;
    planet.description = req.body.description;
    planet.startDay = new Date(req.body.startDay);
    planet.endDay = new Date(req.body.endDay);

    req.user.save(function(err){
        res.send({planet : planet});
    });
};

// Delete

