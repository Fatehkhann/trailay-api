const validator = require('validator');

const {mongooseConn} = require('../server/db/mongoose');

module.exports.userSchemaFields = {
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
        type: String
    },

    user_type: {
        type: String,
        required: false,
        default: 'driver'
    },

    user_index: {
        type: Number,
        required: true
    },

    carriers_ids: [],

    duty_status: {
        type: String,
        default: 'Off Duty'
    },

    user_status: {
        type: String,
        default: 'Active'
    },

    created_at: {
        type: Date,
        required: true
    },

    updated_at: {
        type: Date,
        required: true
    },

    cnic_no: {
        type: String,
        unique: true,
        validate: {
          validator: function(v) {
            return /\d{5}-\d{7}-\d{1}/.test(v);
          },
          message: '{VALUE} is not a valid CNIC no or it is already taken!'
        }
    },

    user_age: {
        type: Number
    },

    current_location: [],

    businessName: {
        type: String,
        minlength: 3
    },

    address: {
        type: String,
        minLength: 6
    },

    driving_licence_no: {
        type: String,
        unique: true
    },

    driving_licence_city: {
        type: String
    },

    driver_licence_type: {
        type: String
    },

    drivers: [],

    vehicles: [],

    carrier_licence_no: {
        type: String
    },

    parent_user: {
        type: mongooseConn.Schema.Types.ObjectId,
        required: false
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
};