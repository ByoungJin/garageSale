var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var category;
category = new mongoose.Schema({
    name : String,
    picture : String,

    children : [{
        name : String,
        picture : String
    }]
}, schemaOptions);



