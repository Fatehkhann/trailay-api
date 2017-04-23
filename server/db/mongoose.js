var mongoose = require('mongoose');

// Moongoose Connection 
mongoose.Promise = global.Promise;
var connectionString = 'mongodb://fateh:bravoXc234@trailay-cluster-shard-00-00-94p2o.mongodb.net:27017,trailay-cluster-shard-00-01-94p2o.mongodb.net:27017,trailay-cluster-shard-00-02-94p2o.mongodb.net:27017/trailay?ssl=true&replicaSet=Trailay-Cluster-shard-0&authSource=admin';
mongoose.connect(connectionString);
// End of Moongoose Connection 

module.exports = {mongoose};