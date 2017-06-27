var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var recentSeenProductSchema;
recentSeenProductSchema = new mongoose.Schema({
    userId : mongoose.SchemaTypes.ObjectId,
    productId : mongoose.SchemaTypes.ObjectId
}, schemaOptions);

var RecentSeenProduct = mongoose.model('User', recentSeenProductSchema);

module.exports = RecentSeenProduct;