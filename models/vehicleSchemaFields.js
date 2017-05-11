const validator = require('validator');

module.exports.vehicleSchemaFields = {

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

    vehicle_year: {
        type: String,
        required: false
    },

    status: {
        type: String
    },

    carrier_company_id: [],
    
    licence_plate_no: {
        type: String,
        required: true
    },

    fuel_type: {
        type: String
    },

    current_driver: [],

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
        name: 'date_added',
        required: true,
        trim: true
    }

};