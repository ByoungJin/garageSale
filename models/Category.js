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

    children : [{
        name : String,
        picture : String
    }]
}, schemaOptions);

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;