const _ = require('lodash');

const { userSchema } = require('./../models/user.js');
const { logSchema } = require('./../models/log.js');
const { vehicleSchema } = require('./../models/vehicle');
const { ObjectID } = require('mongodb');

//user's signup function

function getResponse(reqType, path, authenticate, routeObject) {
    var { app } = require('../server/server');

    switch (reqType) {
        case "get":
            req = routeObject.req;
            res = routeObject.res;
            switch (path) {
                case '/':
                    res.send('Trailay API Homepage');
                    break;
                case '/users':
                    userSchema.find(req.body).then((users) => {
                        res.status(200).send({users});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/user/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    userSchema.findById(id).then((user) => {
                        res.status(200).send(_.pick(user.toObject(), ['drivers', 'email', 'firstName', 'user_type']));
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/user/drivers/:id':
                    var id = req.params.id;
                    if (!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    userSchema.findById(id).then((user) => {
                        userSchema.find({ _id: { $in: user.drivers } }).then((doc) => {
                            res.status(200).send(doc);
                        }, (err) => {
                            res.status(400).send('Error occured');
                        });

                    });
                    break;
                case '/user/fleet_managers/:id':
                    var id = req.params.id;
                    if (!ObjectID.isValid(id)) {
                        console.log('Error in sent id');
                        return res.status(404).send();
                    }
                    userSchema.findById(id).then((user) => {
                        userSchema.find({ _id: { $in: user.fleet_managers } }).then((doc) => {
                            res.status(200).send(doc);
                        }, (err) => {
                            res.status(400).send('Error occured' + err);
                        });

                    });
                    break;
                case '/users/me':
                    res.send(req.user);
                    break;
                case '/logs':
                    logSchema.find({
                        log_creator: req.user._id
                    }).then((logs) => {
                        res.status(200).send({logs});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/logs/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return resizeBy.status(404).send();
                    }
                    logSchema.findOne({
                        _id: id,
                        log_creator: req.user._id
                    }).then((logs) => {
                        if(!logs) {
                            return res.status(404).send();
                        }
                        res.status(200).send({logs});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/vehicles':
                    vehicleSchema.find().then((vehicles) => {
                        if(!vehicles) {
                            return res.status(404).send();
                        }
                        res.status(200).send({vehicles});
                    }, (err) => {
                        res.status(400).send('Error occured:' + err);
                    })
                    break;
                case '/vehicles/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return resizeBy.status(404).send();
                    }
                    logSchema.findOne({
                        _id: id,
                        _logCreator: req.user._id
                    }).then((logs) => {
                        if(!logs) {
                            return res.status(404).send();
                        }
                        res.status(200).send({logs});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                default:
                    res.status(400).send('Bad request, teminating operation...');
                    break;
            }
            break;

        case "post":
            req = routeObject.req;
            res = routeObject.res;
            switch (path) {
                case '/signup/user':
                    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'phone', 'created_at', 'updated_at']);
                    var user = new userSchema({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: body.password,
                        phone: body.phone,
                        created_at: Date(),
                        updated_at: Date()
                    });
                    user.save().then(() => {
                        return user.generateAuthToken();
                    }).then((token) => {
                        res.setHeader("Access-Control-Expose-Headers", "x-auth");
                        res.header({
                            'x-auth': token
                        }).send(_.pick(user.toObject(), ['lastName', '_id', 'email', 'firstName', 'user_type']));
                    }).catch((e) => {
                        res.status(400).send(e);
                    })
                    break;
                case '/addLog':
                    var body = _.pick(req.body, ['userId', 'driversEmail','userName', 'starting_point', 
                    'destination', 'contractor_name', 'contractor_id', 'distance', 
                    'hoursOnRoad', 'date_added', 'completed', 'log_creator']);
                    var userLog = new logSchema({
                        userId: body.userId,
                        driversEmail: body.driversEmail,
                        userName: body.userName,
                        destination: body.destination,
                        contractor_name: body.contractor_name,
                        contractor_id: body.contractor_id,
                        distance: body.distance,
                        hoursOnRoad: body.hoursOnRoad,
                        date_added: body.date_added,
                        completed: body.completed,
                        log_creator: req.user._id,
                        starting_point: body.starting_point
                    });
                    userLog.save().then((doc) => {
                        res.status(200).send(doc);
                    }, (err) => {
                        res.status(400).send('Failed' + err);
                    });
                    break;
                case '/user/login':
                    var body = _.pick(req.body, ['email', 'password']);
                    userSchema.findByCredentials(body.email, body.password).then((user) => {
                        return user.generateAuthToken().then((token) => {
                            res.setHeader("Access-Control-Expose-Headers", "x-auth");
                            res.header({
                                'x-auth': token
                            }).send(user);
                        })
                    }).catch((e) => {
                        res.status(400).send();
                    })
                    break;
                case '/addVehicle':
                    var body = _.pick(req.body, ['vehicle_name',
                    'vehicle_trailay_id','vehicle_make','vehicle_model',
                    'status','freight_company_id', 
                    'number_plate_no', 'registration_city',
                    'total_mileage_covered', 'hours_on_road',
                    'date_added']);
                    var newVehicle = new vehicleSchema({
                        vehicle_name: body.vehicle_name,
                        vehicle_owner_id: req.user._id,
                        vehicle_trailay_id: body.vehicle_trailay_id ,
                        vehicle_make: body.vehicle_make ,
                        vehicle_model: body.vehicle_model ,
                        status: body.status,
                        freight_company_id: body.freight_company_id , 
                        number_plate_no: body.number_plate_no , 
                        registration_city: body.registration_city ,
                        total_mileage_covered: body.total_mileage_covered , 
                        hours_on_road: body.hours_on_road,
                        date_added: body.date_added
                    })
                    newVehicle.save().then((vehicle) => {
                        res.status(200).send(vehicle);
                    }, (err) => {
                        res.status(400).send('Saving Failed' + err);
                    });
                    break;
                default:
                    res.status(400).send('Bad request');
                    break;
            }
            break;

        case 'delete':
            req = routeObject.req;
            res = routeObject.res;
            switch (path) {
                case '/user/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    userSchema.findByIdAndRemove(id).then((user) => {
                        res.status(200).send({user});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/log/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    logSchema.findOneAndRemove({
                        _id: id,
                        _logCreator: req.user._id
                    }).then((log) => {
                        res.status(200).send({log});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/users/me/token':
                    req.user.removeToken(req.token).then((user)=> {
                        res.status(200).send(user);
                    }).catch((e) => {
                        res.status(400).send(e);
                    });
                    break;
                case '/vehicles/:id':
                    var id = req.params.id;
                    vehicleSchema.findOneAndRemove({
                        _id: id,
                        vehicle_owner_id: req.user._id
                    }).then((deletedVehicle)=> {
                        res.status(200).send(deletedVehicle);
                    }).catch((e) => {
                        res.status(400).send(e);
                    });
                    break;
                default: 
                    res.status(400).send('Bad request');
                    break;
            }
            break;

        case 'patch':
            req = routeObject.req;
            res = routeObject.res;
            switch (path) {
                case '/user/:id':
                    var id = req.params.id;
                    var body = _.pick(req.body, ['firstName', 'lastName', 'phone', 
                    'email', 'city', 'user_type', 'carriers_ids', 'duty_status', 'user_status',
                    'created_at', 'updated_at', 'cnic_no', 'user_age', 'current_location', 'businessName', 'address', 
                    'driving_licence_no', 'driving_licence_city', 'driving_licence_type', 'vehicles', 'parent_user', 'city']);
                    var arrayBody = _.pick(req.body, ['fleet_managers', 'drivers']);

                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    userSchema.findByIdAndUpdate(id, {$set: body, $push: arrayBody || {}}, {upsert: false, new: true}).then((user) => {
                        res.status(200).send(_.pick(user.toObject(), ['drivers', 'email', 'firstName', 'user_type']));
                    }, (err) => {
                        res.status(400).send('Error occured: ' + err);
                    });
                    break;
                case '/chngusertype':
                    var id = req.user._id;
                    var body = _.pick(req.body, ['user_type']);
                    if(!ObjectID.isValid(id)) {
                        res.status(404).send('ID Not Valid');
                    }
                    userSchema.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
                        res.status(200).send({user});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/log/:id':
                    var id = req.params.id;
                    var body = _.pick(req.body, ['completed', 'destination', 'contractor_name', 'contractor_id', 'distance', 
                    'hours_on_road', 'date_added', 'completed', 'log_creator'])
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    logSchema.findOneAndUpdate({
                        _id: id,
                        _logCreator: req.user._id
                    }, {$set: body}, {new: true}).then((log) => {
                        res.status(200).send({log});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/vehicle/:id':
                    var id = req.params.id;
                    var body = _.pick(req.body, ['vehicle_name', 'vehicle_owner_id', 'vehicle_trailay_id', 'vehicle_make', 
                    'vehicle_model', 'vehicle_year', 'status', 'carrier_company_id', 'licence_plate_no', 'fuel_type', 'current_driver'
                    , 'registration_city', 'total_mileage_covered', 'hours_on_road', 'date_added']);
                    
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    vehicleSchema.findOneAndUpdate({
                        _id: id
                    }, {$set: body}, {new: true}).then((vehicle) => {
                        res.status(200).send({vehicle});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                default: 
                    res.status(400).send('Bad request');
                    break;
            }
            break;
        
        default:
            console.log('Unauthorized Access');
            break;
    }
}

// Export above function to server.js file, so routes could be setup
module.exports = { getResponse }

