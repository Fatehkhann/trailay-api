const validator = require('validator');
const {mongooseConn} = require('../server/db/mongoose');

module.exports.logSchemaFields = {

    driversEmail: {
        type: String,
        name: 'driversEmail',
        required: true,
        minLength: 7,
        trim: true,
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },

    starting_point: {
        type: String,
        name: 'startingPoint',
        required: true,
        trim: true
    },
    
    destination: {
        type: String,
        name: 'destination',
        required: true,
        trim: true
    },

    contractor_name: {
        type: String,
        name: 'contractorName',
        required: true,
        trim: true
    },

    contractor_id: {
        type: String,
        name: 'contractorId',
        required: true,
        trim: true
    },

    distance: {
        type: Number,
        name: 'distance',
        trim: true
      },

    hours_on_road: {
        type: String,
        name: 'hoursOnRoad',
        trim: true,
    },

    package_type: {
        type: String
    },

    package_details: {
        type: String,
        minLength: 10
    },

    package_weight: {
        type: String
    },

    date_added: {
        type: Date,
        name: 'date',
        required: true,
        trim: true
    },

    completed: {
        type: Boolean,
        name: 'completed',
        default: false
    },

    log_creator: {
        type: mongooseConn.Schema.Types.ObjectId,
        required: true
    }
}