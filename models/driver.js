const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const {mongooseConn} = require('../server/db/mongoose');

var DriverSchema = new mongooseConn.Schema({
    firstName: {
        type: String,
        name: 'firstName',
        required: true,
        minLength: 2,
        trim: true
    },

    lastName: {
        type: String,
        name: 'lastName',
        required: true,
        minLength: 2,
        trim: true
    },

    phone: {
        type: String,
        unique: true,
        validate: {
          validator: function(v) {
            return /\d{4}-\d{7}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required'],
        trim: true
      },

    email: {
        type: String,
        name: 'email',
        required: true,
        minLength: 7,
        trim: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Model Methods
DriverSchema.methods.generateAuthToken = function() {
    var driver = this;
    var access = 'auth';
    var token = jwt.sign({_id: driver._id.toHexString(), access}, 'abc123').toString();

    driver.tokens.push({access, token});

    return driver.save().then(() => {
        return token;
    });
}

DriverSchema.methods.toJSON = function() {
    var driver = this;
    var driverObject = driver.toObject();

    return _.pick(driverObject, ['_id', 'email', 'firstName']);
}

//Instance Methods 
DriverSchema.statics.findByToken = function(token) {
    var Driver = this;
    var decoded = undefined;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {
        return Promise.reject();
    }

    return Driver.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

module.exports.driverSchema = mongooseConn.model('Driver', DriverSchema )