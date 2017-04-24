const {driverSchema} = require('./../../models/driver.js');

//Middleware 

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    driverSchema.findByToken(token).then((driver) => {
        if (!driver) {
            return Promise.reject();
        }
        req.driver = driver;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
}

module.exports = {authenticate};