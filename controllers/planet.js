var User = require('../models/User');
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

    req.user.point.coordinates = [req.body.latitude, req.body.longitude];

    var planet = req.user.planet;

    planet.name = req.body.name;
    planet.address = req.body.address;
    planet.description = req.body.description;
    planet.startDay = new Date(req.body.startDay);
    planet.endDay = new Date(req.body.endDay);

    req.user.save(function(err){
        res.send({user : req.user});
    });

};


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


// Read : 현재 위치와 가까운 순으로 Listing
exports.planetRead = function(req, res, next){
    req.assert('longitude', 'longitude cannot be blank').notEmpty();
    req.assert('latitude', 'latitude cannot be blank').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    User.find({
        "point" : {
            $near : {
                $geometry : {
                    type : "Point" ,
                    coordinates : [req.body.longitude, req.body.latitude]
                }
            }
        }
    },{
        name : true,
        email : true,
        point : true,
        planet : true
    }).limit(5).exec(function(err, users){
        res.send({users : users});
    });

};

// Delete

