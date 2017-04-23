const _ = require('lodash');

const { driverSchema } = require('./../models/driver.js');
const { contractorSchema } = require('./../models/contractor.js');
const { logSchema } = require('./../models/log.js');
const { ObjectID } = require('mongodb');

//Driver's signup function

function getResponse(reqType, path, routeObject) {
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
                    var driverAbdul = new driverSchema({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                    });
                    driverAbdul.save().then((doc) => {
                        res.status(200).send(doc);
                    }, (err) => {
                        res.status(400).send('Failed' + err);
                    });
                    break;
                case '/signup/contractor':
                    var contractor = new contractorSchema({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        city: req.body.city
                    });
                    contractor.save().then((doc) => {
                        res.status(200).send(doc);
                    }, (err) => {
                        res.status(400).send('Failed' + err);
                    });
                    break;
                case '/addLog':
                    var driverLog = new logSchema({
                        driverId: req.body.driverId,
                        driverName: req.body.driverName,
                        startingPoint: req.body.startingPoint,
                        destination: req.body.destination,
                        contractorName: req.body.contractorName,
                        contractorId: req.body.contractorId,
                        distance: req.body.distance,
                        hoursOnRoad: req.body.hoursOnRoad,
                        date: req.body.date,
                        completed: req.body.completed,
                    });
                    driverLog.save().then((doc) => {
                        res.status(200).send(doc);
                    }, (err) => {
                        res.status(400).send('Failed' + err);
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

module.exports = { getResponse }

///// Driver's signup function ENDED /////////////
