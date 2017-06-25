var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var planet;
planet = new mongoose.Schema({
    name : String,
    address : String,
    gps : [Number],
    description : String,
    startDay : Date,
    endDay : Date,
    products : [mongoose.SchemaTypes.ObjectId],
    comments : [{
        userId : mongoose.SchemaTypes.ObjectId,
        contents : String,
        createDay : String
    }]
});

var userSchema;
userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    gender: String,
    location: String,
    website: String,
    picture: String,
    facebook: String,
    twitter: String,
    google: String,
    github: String,
    vk: String,
    planets : [planet],
    favoritePlanet : [mongoose.SchemaTypes.ObjectId],
    favoriteProducts : [mongoose.SchemaTypes.ObjectId]

}, schemaOptions);

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.virtual('gravatar').get(function() {
  if (!this.get('email')) {
    return 'https://gravatar.com/avatar/?s=200&d=retro';
  }
  var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});

userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
