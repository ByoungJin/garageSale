var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var recentSeenPlanetSchema;
recentSeenPlanetSchema = new mongoose.Schema({
    userId : {type : mongoose.SchemaTypes.ObjectId, ref : 'User'},
    productId : {type : mongoose.SchemaTypes.ObjectId, ref : 'Product'}
}, schemaOptions);

var RecentSeenPlanet = mongoose.model('RecentSeenPlanet', recentSeenPlanetSchema);

module.exports = RecentSeenPlanet;




