const _ = require('lodash');

const { driverSchema } = require('./../models/driver.js');
const { contractorSchema } = require('./../models/contractor.js');
const { logSchema } = require('./../models/log.js');
const { ObjectID } = require('mongodb');

//Driver's signup function

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
                case '/drivers':
                    driverSchema.find().then((drivers) => {
                        res.status(200).send({drivers});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/driver/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    driverSchema.findById(id).then((driver) => {
                        res.status(200).send({driver});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/drivers/me':
                    res.send(req.driver);
                    break;
                case '/contractors':
                    contractorSchema.find().then((contractors) => {
                        res.status(200).send({contractors});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/logs':
                    logSchema.find().then((logs) => {
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
                case '/signup/driver':
                    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'phone']);
                    var driver = new driverSchema({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: body.password,
                        phone: body.phone,
                    });
                    driver.save().then(() => {
                        return driver.generateAuthToken();
                    }).then((token) => {
                        res.header({'x-auth': token}).send(driver);
                    }).catch((e) => {
                        res.status(400).send(e);
                    })
                    break;
                case '/signup/contractor':
                    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'phone', 'city']);
                    var contractor = new contractorSchema({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: body.password,
                        phone: body.phone,
                        city: body.city
                    });
                    contractor.save().then(() => {
                        return contractor.generateAuthToken();
                    }).then((token) => {
                        res.header({'x-auth': token}).send(contractor);
                    }).catch((e) => {
                        res.status(400).send(e);
                    })
                    break;
                case '/addLog':
                    var body = _.pick(req.body, ['driverId', 'driverName', 'startingPoint', 
                    'destination', 'contractorName', 'contractorId', 'distance', 
                    'hoursOnRoad', 'date', 'completed']);
                    var driverLog = new logSchema({
                        driverId: body.driverId,
                        driverName: body.driverName,
                        startingPoint: body.startingPoint,
                        destination: body.destination,
                        contractorName: body.contractorName,
                        contractorId: body.contractorId,
                        distance: body.distance,
                        hoursOnRoad: body.hoursOnRoad,
                        date: body.date,
                        completed: body.completed,
                    });
                    driverLog.save().then((doc) => {
                        res.status(200).send(doc);
                    }, (err) => {
                        res.status(400).send('Failed' + err);
                    });
                    break;
                case '/driver/login':
                    var body = _.pick(req.body, ['email', 'password']);
                    driverSchema.findByCredentials(body.email, body.password).then((driver) => {
                        return driver.generateAuthToken().then((token) => {
                            res.header('x-auth', token).send(driver);
                        })
                    }).catch((e) => {
                        res.status(400).send();
                    })
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
                case '/driver/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    driverSchema.findByIdAndRemove(id).then((driver) => {
                        res.status(200).send({driver});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/contractor/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    contractorSchema.findByIdAndRemove(id).then((contractor) => {
                        res.status(200).send({contractor});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/log/:id':
                    var id = req.params.id;
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    logSchema.findByIdAndRemove(id).then((log) => {
                        res.status(200).send({log});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
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
                case '/driver/:id':
                    var id = req.params.id;
                    var body = _.pick(req.body, ['firstName', 'lastName'])
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    driverSchema.findByIdAndUpdate(id, {$set: body}, {new: true}).then((driver) => {
                        res.status(200).send({driver});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/contractor/:id':
                    var id = req.params.id;
                    var body = _.pick(req.body, ['firstName', 'lastName', 'city'])
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    contractorSchema.findByIdAndUpdate(id, {$set: body}, {new: true}).then((contractor) => {
                        res.status(200).send({contractor});
                    }, (err) => {
                        res.status(400).send('Error occured');
                    })
                    break;
                case '/log/:id':
                    var id = req.params.id;
                    var body = _.pick(req.body, ['completed'])
                    if(!ObjectID.isValid(id)) {
                        return res.status(404).send();
                    }
                    logSchema.findByIdAndUpdate(id, {$set: body}, {new: true}).then((log) => {
                        res.status(200).send({log});
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

