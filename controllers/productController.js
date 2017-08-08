var Product = require('../models/Product');
var co = require('co');

// Create
exports.productCreate = function (req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  if (!req.user.planet.name) {
    return res.status(401).send({msg: 'Planet not exist'});
  }

  var product = new Product();

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;

  // product 저장
  product.save(function (err) {
    // planets에 product 연결
    req.user.planet.products.push(product.id);
    req.user.save(function (err) {
      res.send({product: product});
    });
  });

};

// Read
/*
 * 가장 가까운 5개의 상점 리스트를 가져옴
 * */



// Update

exports.productUpdate = co.wrap(function*(req, res, next) {

  req.assert('id', 'id cannot be blank').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  // id로 검색
  var product = yield Product.readOne(req.body.id);

  if (!product) {
    return res.status(400).send({msg: "Could not find product"});
  }

  if (req.body.name)
    product.name = req.body.name;
  if (req.body.description)
    product.description = req.body.description;
  if (req.body.price)
    product.price = req.body.price;

  product.save(function (err) {
    res.send({product: product});
  });

});

// Delete
exports.productDelete = co.wrap(function*(req, res) {
  const product = yield Product.readOne(req.body.productId);
  if (!product) {
    return res.status(400).send({msg: "Could not find product"});
  }
  product.remove(function(){
    res.send({msg : "remove success"});
  });
});