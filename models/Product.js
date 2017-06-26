var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var product;
product = new mongoose.Schema({
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
    isSoldOut : boolean
}, schemaOptions);

