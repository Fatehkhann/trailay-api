const {userSchema} = require('./../../models/user.js');

//Middleware 

var authenticate = (req, res, next) => {
    //console.log('Authenticating...');
    var token = req.header('x-auth');
    userSchema.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        //console.log(req.user);
        next();
    }).catch((err) => {
        res.status(401).send();
    });
}

module.exports = {authenticate};