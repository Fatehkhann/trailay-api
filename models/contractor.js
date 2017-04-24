const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const {mongooseConn} = require('../server/db/mongoose');

var ContractorSchema = new mongooseConn.Schema({
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
    
    city: {
        type: String,
        required: false
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

ContractorSchema.methods.generateAuthToken = function() {
    var contractor = this;
    var access = 'auth';
    var token = jwt.sign({_id: contractor._id.toHexString(), access}, 'abc123').toString();

    contractor.tokens.push({access, token});

    return contractor.save().then(() => {
        return token;
    });
}

ContractorSchema.methods.toJSON = function() {
    var contractor = this;
    var contractorObject = contractor.toObject();

    return _.pick(contractorObject, ['_id', 'email', 'firstName']);
}

module.exports.contractorSchema = mongooseConn.model('Contractor', ContractorSchema);