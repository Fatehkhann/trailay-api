const express = require('express');
const user = require('../helpers/users');
const {MongoClient} = require('mongodb');

var app = express();
const nodePort = 3000;

app.get('/', (req, res) => {
    res.send('Trailay API server is up and running');
});

user.addDriver(app, '/function');

MongoClient.connect('mongodb://fateh:bravoXc234@trailay-cluster-shard-00-00-94p2o.mongodb.net:27017,trailay-cluster-shard-00-01-94p2o.mongodb.net:27017,trailay-cluster-shard-00-02-94p2o.mongodb.net:27017/trailay?ssl=true&replicaSet=Trailay-Cluster-shard-0&authSource=admin', (err, db) => {
    if(err) {
        return console.log('Error in connection');
    }
    db.collection('drivers').insertOne({
        name: 'Fateh Khan',
        email: 'fatehkhann@gmail.com',
        truck: 'Bedford 2008',
        city: 'Taxila'
    }, (err, results) => {
        if (err) {
            return console.log('Unable to insert a record', err);
        }
        console.log('Record added! ', JSON.stringify(results.ops, undefined, 2));
    })
});



app.listen(nodePort,() => {
    console.log('Server is up and running on port', nodePort);
});
