var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var recentSeenProductSchema;
recentSeenProductSchema = new mongoose.Schema({
    userId : {type : mongoose.SchemaTypes.ObjectId, ref : 'User'},
    productId : {type : mongoose.SchemaTypes.ObjectId, ref : 'Product'}
}, schemaOptions).plugin(require('mongoose-id'));

var RecentSeenProduct = mongoose.model('User', recentSeenProductSchema);

module.exports = RecentSeenProduct;