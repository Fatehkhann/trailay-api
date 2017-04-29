const _ = require('lodash');
const validator = require('validator');

const {mongooseConn} = require('../server/db/mongoose');

var VehicleSchema = new mongooseConn.Schema({

    vehicle_name: {
        type: String,
        minlength: 2,
        required: false
    },

    vehicle_owner_id: {
        type: String
    },

    vehicle_trailay_id: {
        type: Number,
        required: true
    },

    vehicle_make: {
        type: String,
        required: true
    },

    vehicle_model: {
        type: String,
        required: false
    },

    status: {
        type: String
    },

    freight_company_id: {
        type: mongooseConn.Schema.Types.ObjectId,
        required: false
    },
    
    number_plate_no: {
        type: String,
        required: true
    },

    registration_city: {
        type: String
    },

    total_mileage_covered: {
        type: Number,
        name: 'distance',
        trim: true
      },

    hours_on_road: {
        type: String,
        name: 'hoursOnRoad',
        trim: true,
    },

    date_added: {
        type: Date,
        name: 'date',
        required: true,
        trim: true
    }

});

//Instance Methods 

VehicleSchema.statics.findByTrailayId = function(id) {
    var vehicle = this;
    var decoded = undefined;

    vehicle.findOne({
        'vehicle_trailay_id': id
    }).then((vehicleFound) => {
        return vehicleFound;
    }).catch((e) => {
        return 'An Error Occured' + e ;
    })
}

VehicleSchema.methods.toJSON = function() {
    var vehicle = this;
    var vehicleObject = vehicle.toObject();

    return _.pick(vehicleObject, ['_id', 'vehicle_name', 'vehicle_make', 'status', 'freight_company_id']);
}

// End of Instance Methods

module.exports.vehicleSchema = mongooseConn.model('Vehicles', VehicleSchema);
//mongooseConn.connection.close();