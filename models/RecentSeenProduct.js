var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var recentSeenProduct;
recentSeenProduct = new mongoose.Schema({
    userId : mongoose.SchemaTypes.ObjectId,
    productId : mongoose.SchemaTypes.ObjectId
}, schemaOptions);



