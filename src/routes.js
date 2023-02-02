var express = require('express');
var route = express();

// import controller
const register = require('./handlers/registry')
const user = require('./handlers/user')
const vehicle = require('./handlers/vehicle')
const report = require('./handlers/report')
const auth = require('./handlers/auth')

//parkinglot
route.post('/register/entry', register.handleCreateEntry);
route.post('/register/exit', register.handleCreateExit);
route.post('/register/start_month', register.startMonth);
route.get('/register', register.list);
route.delete('/register/:id', register.delete);
route.put('/register/:id', register.update);
route.get('/register/:id', register.findOne);

//reports
route.get('/report/resident', report.handleMakResidentReport);

// vehicles
route.post('/vehicle/create_official', vehicle.handleCreateOfficial);
route.post('/vehicle/create_resident/', vehicle.handleCreateResident);
route.get('/vehicle', vehicle.list);
route.delete('/vehicle/:number_plate', vehicle.delete);
route.put('/vehicle/:number_plate', vehicle.update);
route.get('/vehicle/:number_plate', vehicle.get);

//auth
route.post('/auth/singup', auth.singup);
route.post('/auth/login', auth.login);

//users
route.get('/user', user.list);
route.delete('/user/:id', user.delete);
route.put('/user/:id', user.update);
route.get('/user/:id', user.get);



module.exports = route;