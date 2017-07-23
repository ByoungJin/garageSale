var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var planetShapeSchema;
planetShapeSchema = new mongoose.Schema({
  name : {type: String, unique: true},
  picture : {type: String, unique: true}
}, schemaOptions).plugin(require('mongoose-id'));

var PlanetShape = mongoose.model('PlanetShape', planetShapeSchema);

module.exports = PlanetShape;
