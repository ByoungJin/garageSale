var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var productSchema;
productSchema = new mongoose.Schema({
  name: String,
  description: String,
  parentCategory: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
  childCategory: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
  likeUsers: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
  picture: [String],
  price: Number,
  isSoldOut: {type: Boolean, default: false}
}, schemaOptions).plugin(require('mongoose-id'));

productSchema.statics = {
  getProduct : function (id) {
    return this.findOne({_id : id}).exec();
  }
};

var Product = mongoose.model('Product', productSchema);

module.exports = Product;