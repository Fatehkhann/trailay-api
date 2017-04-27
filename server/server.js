require('./config/config');

const express = require('express');
const route = require('../helpers/routes');
const bodyParser = require('body-parser');

const {addRoute} = require('../helpers/routes');
const {authenticate} = require('./middleware/middleware');

var app = express();
app.use(bodyParser.json());
const nodePort = process.env.PORT || 3000;

app.listen(nodePort,() => {
    console.log('Server is up and running on port', nodePort);
});


//API ROUTES

////////////////////////POST
app.post('/signup/driver', (req, res) => {
    route.getResponse('post', '/signup/driver', undefined, {req, res});
});

app.post('/driver/login', (req, res) => {
    route.getResponse('post', '/driver/login', undefined, {req, res});
});

app.post('/signup/contractor', (req, res) => {
    route.getResponse('post', '/signup/contractor', undefined, {req, res});
});

app.post('/addLog', authenticate, (req, res) => {
    route.getResponse('post', '/addLog', authenticate, {req, res});
});

/////////////////////////GET
app.get('/', (req, res) => {
    route.getResponse('get', '/', undefined, {req, res});
});

app.get('/drivers', (req, res) => {
    route.getResponse('get', '/drivers', undefined, {req, res});
});

app.get('/drivers/me', authenticate, (req, res) => {
    route.getResponse('get', '/drivers/me', authenticate, {req, res});
});

app.get('/driver/:id', (req, res) => {
    route.getResponse('get', '/driver/:id', undefined, {req, res});
});

app.get('/contractors', (req, res) => {
    route.getResponse('get', '/contractors', undefined, {req, res});
});

app.get('/logs', authenticate, (req, res) => {
    route.getResponse('get', '/logs', authenticate, {req, res});
});

app.get('/logs/:id', authenticate, (req, res) => {
    route.getResponse('get', '/logs/:id', authenticate, {req, res});
});

//////////////////////////////// DELETE

app.delete('/driver/:id', (req, res) => {
    route.getResponse('delete', '/driver/:id', undefined, {req, res});
});

app.delete('/contractor/:id', (req, res) => {
    route.getResponse('delete', '/contractor/:id', undefined, {req, res});
});

app.delete('/log/:id', authenticate, (req, res) => {
    route.getResponse('delete', '/log/:id', authenticate, {req, res});
});

app.delete('/drivers/me/token', authenticate, (req, res) => {
    route.getResponse('delete', '/drivers/me/token', authenticate, {req, res});
});

//////////////////////////////// PATCH 

app.patch('/driver/:id', (req, res) => {
    route.getResponse('patch', '/driver/:id', undefined, {req, res});
})

app.patch('/contractor/:id', (req, res) => {
    route.getResponse('patch', '/contractor/:id', undefined, {req, res});
})

app.patch('/log/:id', authenticate, (req, res) => {
    route.getResponse('patch', '/log/:id', authenticate, {req, res});
})



