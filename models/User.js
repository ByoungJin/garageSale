var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
//var planet = require('./Planet');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

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
    point: {
        type: {type: String, default: 'Point'}, coordinates: [Number],
    },
    planet: {
        name: String,
        address: String,

        description: String,
        startDay: Date,
        endDay: Date,
        products: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Product'}],
        comments: [{
            userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
            contents: String,
            createDay: String
        }],
        planetShape: {type: mongoose.SchemaTypes.ObjectId, ref: 'PlanetShape'}
    },
    favoritePlanet: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
    favoriteProducts: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Product'}],
    favoriteCategory: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}]
}, schemaOptions).plugin(require('mongoose-id'));
userSchema.index({point: '2dsphere'});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};

userSchema.virtual('gravatar').get(function () {
    if (!this.get('email')) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }
    var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});

userSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
    }
};

// 비지니스 로직
userSchema.statics = {
    list: function (_id, longitude, latitude) {
        return this.find({
            $and: [
                {
                    "point": {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            }
                        }
                    }
                }, {
                    "_id": {$ne: _id}
                }
            ]
        }, {
            name: true,
            email: true,
            point: true,
            planet: true
        }).limit(5).populate('planet.products').exec();
        // return users;
    },
    getUser: function (email) {
        return this.findOne({email: email}).populate('planet.products').exec();
    },
    getGoogleUser: function (google) {
        return this.findOne({google: google}).populate('planet.products').exec();
    }

};

var User = mongoose.model('User', userSchema);

module.exports = User;
