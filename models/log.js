const validator = require('validator');

const {mongooseConn} = require('../server/db/mongoose');

var LogSchema = new mongooseConn.Schema({

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

    date_added: {
        type: Date,
        name: 'date',
        required: true,
        trim: true
    },

    completed: {
        type: Boolean,
        name: 'completed'
    },

    _logCreator: {
        type: mongooseConn.Schema.Types.ObjectId,
        required: true
    }
});

module.exports.logSchema = mongooseConn.model('Logs', LogSchema);