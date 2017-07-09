var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var apkInfoSchema;
apkInfoSchema = new mongoose.Schema({
  name: String,
  installPageUrl: String,
  picture: String,

}, schemaOptions).plugin(require('mongoose-id'));


// 비지니스 로직
apkInfoSchema.statics = {
  listAll: function () {
    return this.find().exec();
  }
};

var ApkInfo = mongoose.model('ApkInfo', apkInfoSchema);

module.exports = ApkInfo;