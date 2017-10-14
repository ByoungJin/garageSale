const Category = require('../models/Category');
const co = require('co');

// Create
exports.categoryCreate = function (req, res) {
  req.assert('name', 'name is not valid').notEmpty();
  req.assert('level', 'level cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  const category = new Category();
  category.name = req.body.name;
  category.picture = req.body.picture;
  category.level = req.body.level;

  // category 저장
  category.save(function () {
    res.send({category: category});
  });
};

// Read Category List
exports.categoryList = co.wrap(function*(req, res) {
  const categorys = yield Category.list();
  if (!categorys) {
    return res.status(401).send({
      msg: 'Could not find Categorys'
    });
  }

  res.send({categorys: categorys});
});

// Delete
exports.categoryDelete = co.wrap(function*(req, res) {
  const category = yield Category.readOne(req.body.categoryId);
  if (!category) {
    return res.status(401).send({
      msg: 'Could not find Category'
    });
  }
  category.remove(function(){
    res.send({msg : "remove success"});
  });
});