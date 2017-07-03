var User = require('../models/User');

// Update

exports.planetUpdate = function(req, res, next){
    req.assert('name', 'Name cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    req.user.point.coordinates = [req.body.latitude, req.body.longitude];

    var planet = req.user.planet;

    planet.name = req.body.name;
    //planet.address = req.body.address;
    planet.description = req.body.description;
    planet.startDay = new Date(req.body.startDay);
    planet.endDay = new Date(req.body.endDay);

    req.user.save(function(err){

        if(err){
            res.status(401).send({msg : err.message });
        } else {
            res.send({user: req.user});
        }

    });
};




// Delete

