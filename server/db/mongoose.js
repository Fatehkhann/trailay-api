var mongooseConn = require('mongoose');

// Moongoose Connection 
mongooseConn.Promise = global.Promise;
var connectionString = 'mongodb://localhost:27017/trailay';
mongooseConn.connect(process.env.MONGODB_URI || connectionString);
// End of Moongoose Connection 

module.exports = {mongooseConn};