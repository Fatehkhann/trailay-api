var mongoose = require('mongoose');

// Moongoose Connection 
mongoose.Promise = global.Promise;
var connectionString = 'mongodb://localhost:27017/trailay';
mongoose.connect(process.env.MONGODB_URI || connectionString);
// End of Moongoose Connection 

module.exports = {mongoose};