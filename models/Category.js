var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var categorySchema;
categorySchema = new mongoose.Schema({
    name : String,
    picture : String,
    level : Number,
    childrenId : [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}]

}, schemaOptions).plugin(require('mongoose-id'));


// 비지니스 로직
categorySchema.statics = {

  list: function () {
    return this.find({
      level : 1
    }).populate('childrenId').exec();
  },
  readOne: function (categoryId) {
    return this.findOne({_id: new mongoose.Types.ObjectId(categoryId)}).exec();
  }

};

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;