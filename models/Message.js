var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var messageSchema;
messageSchema = new mongoose.Schema({
  message : String,
  sender : {type : mongoose.SchemaTypes.ObjectId, ref : 'User'},
  receiver : {type : mongoose.SchemaTypes.ObjectId, ref : 'User'}
}, schemaOptions).plugin(require('mongoose-id'));

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
