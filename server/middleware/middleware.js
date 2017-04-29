const {userSchema} = require('./../../models/user.js');

//Middleware 

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    userSchema.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
}

module.exports = {authenticate};