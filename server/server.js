const express = require('express');
const route = require('../helpers/routes');
const bodyParser = require('body-parser');

const {addRoute} = require('../helpers/routes');
const {driverSchema} = require('./../models/driver.js');

var app = express();
app.use(bodyParser.json());
const nodePort = 3000;

app.listen(nodePort,() => {
    console.log('Server is up and running on port', nodePort);
});


module.exports = {app};

//API ROUTES
app.post('/signup/driver', (req, res) => {
    route.getResponse('post', '/signup/driver', {req, res});
});

app.post('/signup/contractors', (req, res) => {
    route.getResponse('post', '/signup/contractor', {req, res});
});

app.post('/addLog', (req, res) => {
    route.getResponse('post', '/addLog', {req, res});
});

app.get('/drivers', (req, res) => {
    route.getResponse('get', '/drivers', {req, res});
});

app.get('/contractors', (req, res) => {
    route.getResponse('get', '/contractors', {req, res});
});

app.get('/logs', (req, res) => {
    route.getResponse('get', '/logs', {req, res});
});

// route.addRoute('post', '/signup/contractor');
// route.addRoute('post', '/addLog');
// route.addRoute('get', '/function');
// route.addRoute('get', '/');
//route.addRoute('get', '/drivers');


