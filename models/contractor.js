const validator = require('validator');

const {mongoose} = require('../server/db/mongoose');

module.exports.contractorSchema = mongoose.model('contractors', {
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
    }

})