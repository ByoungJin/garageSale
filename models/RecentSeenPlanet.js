var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var recentSeenPlanet;
recentSeenPlanet = new mongoose.Schema({
    userId : mongoose.SchemaTypes.ObjectId,
    productId : mongoose.SchemaTypes.ObjectId
}, schemaOptions);



