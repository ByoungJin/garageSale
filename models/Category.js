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
    childrenId : [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}]

}, schemaOptions).plugin(require('mongoose-id'));

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;