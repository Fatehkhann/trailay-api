const validator = require('validator');

const {mongoose} = require('../server/db/mongoose');

module.exports.logSchema = mongoose.model('Logs', {
    driverId: {
        type: String,
        name: 'driverId',
        required: true,
        minLength: 8,
        trim: true
    },
    startingPoint: {
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

    contractorName: {
        type: String,
        name: 'contractorName',
        required: true,
        trim: true
    },

    contractorId: {
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

    hoursOnRoad: {
        type: String,
        name: 'hoursOnRoad',
        trim: true,
    },

    date: {
        type: Date,
        name: 'date',
        required: true,
        trim: true
    },

    completed: {
        type: Boolean,
        name: 'completed'
    }

})