const _ = require('lodash');

const {mongooseConn} = require('../server/db/mongoose');
const {vehicleSchemaFields} = require('./vehicleSchemaFields');

var VehicleSchema = new mongooseConn.Schema(vehicleSchemaFields);

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