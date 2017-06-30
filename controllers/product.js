
var Product = require('../models/Product');

// Create
exports.productCreate = function(req, res, next){
    req.assert('name', 'Name cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    if(req.user.planets.length == 0){
        return res.status(401).send({ msg: 'Planet not exist' });
    }

    var product = new Product();

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    // product 저장
    product.save(function(err){
        // planets에 product 연결
        req.user.planets[0].products.push(product.id);
        req.user.save(function(err){
            res.send({product : product});
        });
    });

};

// Read
/*
* 가장 가까운 5개의 상점 리스트를 가져옴
* */



// Update

exports.productUpdate = function(req, res, next){
/*
    req.assert('name', 'Name cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }


    if(req.user.products.length == 0){
        exports.productCreate(req, res, next);
    }

    var product = req.user.products[0];

    product.name = req.body.name;
    product.address = req.body.address;
    product.latitude = req.body.latitude;
    product.longitude = req.body.longitude;
    product.description = req.body.description;
    product.startDay = new Date(req.body.startDay);
    product.endDay = new Date(req.body.endDay);

    req.user.save(function(err){
        res.send({product : product});
    });
    */
};

// Delete

