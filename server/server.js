const express = require('express');
const route = require('../helpers/routes');
const bodyParser = require('body-parser');

const {addRoute} = require('../helpers/routes');
const {driverSchema} = require('./../models/driver.js');

var app = express();
app.use(bodyParser.json());
const nodePort = process.env.PORT || 3000;

app.listen(nodePort,() => {
    console.log('Server is up and running on port', nodePort);
});


//API ROUTES

////////////////////////POST
app.post('/signup/driver', (req, res) => {
    route.getResponse('post', '/signup/driver', {req, res});
});

app.post('/signup/contractor', (req, res) => {
    route.getResponse('post', '/signup/contractor', {req, res});
});

app.post('/addLog', (req, res) => {
    route.getResponse('post', '/addLog', {req, res});
});

/////////////////////////GET
app.get('/', (req, res) => {
    route.getResponse('get', '/', {req, res});
});

app.get('/drivers', (req, res) => {
    route.getResponse('get', '/drivers', {req, res});
});

app.get('/driver/:id', (req, res) => {
    route.getResponse('get', '/driver/:id', {req, res});
});

app.get('/contractors', (req, res) => {
    route.getResponse('get', '/contractors', {req, res});
});

app.get('/logs', (req, res) => {
    route.getResponse('get', '/logs', {req, res});
});

//////////////////////////////// DELETE

app.delete('/driver/:id', (req, res) => {
    route.getResponse('delete', '/driver/:id', {req, res});
});

app.delete('/contractor/:id', (req, res) => {
    route.getResponse('delete', '/contractor/:id', {req, res});
});

app.delete('/log/:id', (req, res) => {
    route.getResponse('delete', '/log/:id', {req, res});
});

//////////////////////////////// PATCH 

app.patch('/driver/:id', (req, res) => {
    route.getResponse('patch', '/driver/:id', {req, res});
})

app.patch('/contractor/:id', (req, res) => {
    route.getResponse('patch', '/contractor/:id', {req, res});
})

app.patch('/log/:id', (req, res) => {
    route.getResponse('patch', '/log/:id', {req, res});
})



