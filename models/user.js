const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require("bcryptjs");
const {userSchemaFields} = require("./userSchemaFields");
var autoIncrement = require('mongoose-auto-increment');

const {mongooseConn} = require('../server/db/mongoose');

var UserSchema = new mongooseConn.Schema(userSchemaFields);
autoIncrement.initialize(mongooseConn);
// Instance Methods
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
}

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    })
}

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email', 'firstName', 'user_type']);
}

//Model Methods 

UserSchema.statics.findByCredentials = function(email, password) {
    var user = this;

    return user.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) =>{
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    })
}

UserSchema.statics.findByToken = function(token) {
    var user = this;
    var decoded = undefined;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) {
        return Promise.reject();
    }

    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

//Mongoose Middleware

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

UserSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'user_index' });

module.exports.userSchema = mongooseConn.model('user', UserSchema )