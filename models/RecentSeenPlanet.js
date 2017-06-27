var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var recentSeenPlanetSchema;
recentSeenPlanetSchema = new mongoose.Schema({
    userId : mongoose.SchemaTypes.ObjectId,
    productId : mongoose.SchemaTypes.ObjectId
}, schemaOptions);

var RecentSeenPlanet = mongoose.model('RecentSeenPlanet', recentSeenPlanetSchema);

module.exports = RecentSeenPlanet;




