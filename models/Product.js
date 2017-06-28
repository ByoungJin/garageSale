var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var productSchema;
productSchema = new mongoose.Schema({
    name : String,
    description : String,
    categoryLevel1 : {
        name : String,
        picture : String
    },
    categoryLevel2 : {
        name : String,
        picture : String
    },
    likeUsers : [mongoose.SchemaTypes.ObjectId],
    picture : [String],
    price : Number,
    isSoldOut : { type: Boolean, default: false }
}, schemaOptions);

var Product = mongoose.model('Product', productSchema);

module.exports = Product;