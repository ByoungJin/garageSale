var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var planetSchema;
planetSchema = new mongoose.Schema({
    name : {type: String, unique: true},
    address : String,
    latitude: Number,
    longitude: Number,
    description : String,
    startDay : Date,
    endDay : Date,
    products : [mongoose.SchemaTypes.ObjectId],
    comments : [{
        userId : mongoose.SchemaTypes.ObjectId,
        contents : String,
        createDay : String
    }]
}, schemaOptions);

var Planet = mongoose.model('Product', planetSchema);

module.exports = Planet;