var mongooseConn = require('mongoose');

// Moongoose Connection 
mongooseConn.Promise = global.Promise;
//var connectionString = 'mongodb://localhost:27017/trailay';
//mongooseConn.connect(process.env.MONGODB_URI || connectionString);
mongooseConn.connect(process.env.MONGODB_URI);
// End of Moongoose Connection 
process.on('SIGINT', function(){
    mongooseConn.connection.close(function(){
        console.log('Connection to DB Closed');
        process.exit(0);
    })
})

module.exports = {mongooseConn};