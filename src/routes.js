var express = require('express');
var route = express();

// import controller
const register = require('./controllers/registry')
const user = require('./controllers/user')
const vehicle = require('./controllers/vehicle')
const report = require('./controllers/report')

//parkinglot
route.post('/register/entry', register.entry);
route.post('/register/exit', register.exit);
route.post('/register/start_month', register.startMonth);
route.get('/register', register.list);
route.delete('/register/:id', register.delete);
route.put('/register/:id', register.update);
route.get('/register/:id', register.findOne);

//reports
route.get('/report/resident', report.makResidentReport);

// vehicles
route.post('/vehicle/create_official', vehicle.create_official);
route.post('/vehicle/create_resident/', vehicle.create_resident);
route.get('/vehicle', vehicle.list);
route.delete('/vehicle/:number_plate', vehicle.delete);
route.put('/vehicle/:number_plate', vehicle.update);
route.get('/vehicle/:number_plate', vehicle.get);

//auth
route.post('/auth/singup', user.singup);
route.post('/auth/login', user.login);

//users
route.get('/user', user.list);
route.delete('/user/:id', user.delete);
route.put('/user/:id', user.update);
route.get('/user/:id', user.get);



module.exports = route;