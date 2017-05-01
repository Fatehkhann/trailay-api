require('./config/config');

const express = require('express');
const route = require('../helpers/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const {addRoute} = require('../helpers/routes');
const {authenticate} = require('./middleware/middleware');

var app = express();
app.use(bodyParser.json());
app.use(cors());

const nodePort = process.env.PORT || 3000;

app.listen(nodePort,() => {
    console.log('Server is up and running on port', nodePort);
});



//API ROUTES

////////////////////////POST
app.post('/signup/user', (req, res) => {
    route.getResponse('post', '/signup/user', undefined, {req, res});
});

app.post('/user/login', (req, res) => {
    route.getResponse('post', '/user/login', undefined, {req, res});
});

app.post('/addLog', authenticate, (req, res) => {
    route.getResponse('post', '/addLog', authenticate, {req, res});
});

app.post('/addVehicle', authenticate, (req, res) => {
    route.getResponse('post', '/addVehicle', authenticate, {req, res});
});

/////////////////////////GET
app.get('/', authenticate, (req, res) => {
    route.getResponse('get', '/', authenticate, {req, res});
});

app.get('/users', authenticate, (req, res) => {
    route.getResponse('get', '/users', authenticate, {req, res});
});

app.get('/users/me', authenticate, (req, res) => {
    route.getResponse('get', '/users/me', authenticate, {req, res});
});

app.get('/user/:id', authenticate, (req, res) => {
    route.getResponse('get', '/user/:id', authenticate, {req, res});
});

app.get('/logs', authenticate, (req, res) => {
    route.getResponse('get', '/logs', authenticate, {req, res});
});

app.get('/logs/:id', authenticate, (req, res) => {
    route.getResponse('get', '/logs/:id', authenticate, {req, res});
});

app.get('/vehicles', authenticate, (req, res) => {
    route.getResponse('get', '/vehicles', authenticate, {req, res});
});

app.get('/vehicles/:id', authenticate, (req, res) => {
    route.getResponse('get', '/vehicles/:id', authenticate, {req, res});
});

//////////////////////////////// DELETE

app.delete('/user/:id', authenticate, (req, res) => {
    route.getResponse('delete', '/user/:id', authenticate, {req, res});
});

app.delete('/log/:id', authenticate, (req, res) => {
    route.getResponse('delete', '/log/:id', authenticate, {req, res});
});

app.delete('/users/me/token', authenticate, (req, res) => {
    route.getResponse('delete', '/users/me/token', authenticate, {req, res});
});

app.delete('/vehicles/:id', authenticate, (req, res) => {
    route.getResponse('delete', '/vehicles/:id', authenticate, {req, res});
});

//////////////////////////////// PATCH 

app.patch('/user/:id', authenticate, (req, res) => {
    route.getResponse('patch', '/user/:id', authenticate, {req, res});
})

app.patch('/log/:id', authenticate, (req, res) => {
    route.getResponse('patch', '/log/:id', authenticate, {req, res});
})

app.patch('/vehicle/:id', authenticate, (req, res) => {
    route.getResponse('patch', '/vehicle/:id', authenticate, {req, res});
})



